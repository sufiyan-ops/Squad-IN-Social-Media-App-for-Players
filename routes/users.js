const config = require('config');
const jwt = require("jsonwebtoken");
const express = require('express');
const {User, validate} = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const auth =  require('../middleware/auth');
const player =  require('../middleware/player');
const organizer=require('../middleware/organizer');
const recruiter=require('../middleware/recruiter');

router.post('/', async(req, res)=> {
    console.log(req.body);
    //req.body = JSON.parse(req.body.body);
    const {error} = validate(req.body);
    if (error) { console.log(error); return res.status(400).send(error.details[0].message);}  
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already registered.');
    user = new User({ 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType,

    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    //const token = user.generateAuthToken();
    res.send(_.pick(user, ["_id","name","email","userType"]));
    //res.header('x-auth-token', token).send(_.pick(user, ["_id","name","email","userType"]));
})


// router.get('/me', auth, async(req, res)=> {
//     //if(!req.params.id) return res.status(400).send("No ID provided");
//     let user = await User.findById(req.user._id).select('-password');
//     res.send(user);
// })
//[auth, admin]
router.get('/me',[auth,player,organizer,recruiter],  async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

//router.get('/me', [auth, admin], async (req, res) => {
router.get('/:id', async (req, res) => {
    let user = await User.findById(req.params.id)
    if (!user) {console.log('returning...'); return res.status(404).send("User not found");    } 
    user =  await User.findById(req.params.id).select('-password');
    res.send(user);
});

router.get('/',  async (req, res) => {
//router.get('/',  async (req, res) => {
    const user = await User.find().select('-password');
    res.send(user);
});

//router.put('/updateuser/:id',[auth, driver], async(req, res)=> {
    router.put('/updateuser/:id', async(req, res)=> {
        const user = await User
        .findById(req.params.id);
        if (!user) return res.status(404).send("User not found");    
        user.name = req.body.name,
        user.email = req.body.email,
        user.password = user.password,
        user.userType = req.body.userType
        
        
        let promises = [];
        promises.push(user.save());
        let result = [] 
        result = await Promise.all(promises);
        res.send(user);
    })
    

module.exports = router;