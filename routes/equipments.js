const config = require('config');
const jwt = require("jsonwebtoken");
const express = require('express');
const {Equipment ,validate} = require('../models/equipment');

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
   
        equipment = new Equipment({ 
        equipmentname: req.body.equipmentname,
        EquipmentCategory: req.body.EquipmentCategory,
        quantity: req.body.quantity,
        Price: req.body.Price,
        Summary: req.body.Summary,

    });

    await equipment.save();
    
    res.send(_.pick(equipment, ["_id","equipmentname","EquipmentCategory","quantity","Price","Summary"]));
    //res.header('x-auth-token', token).send(_.pick(user, ["_id","name","email","userType"]));
})


// router.get('/me', auth, async(req, res)=> {
//     //if(!req.params.id) return res.status(400).send("No ID provided");
//     let user = await User.findById(req.user._id).select('-password');
//     res.send(user);
// })
//[auth, admin]
router.get('/equipment',  async (req, res) => {
    const equipment = await Equipment.find ( { id:req.params.id });
    res.send(equipment);
});

//router.get('/me', [auth, admin], async (req, res) => {
// router.get('/:id', async (req, res) => {
//     let user = await User.findById(req.params.id)
//     if (!user) {console.log('returning...'); return res.status(404).send("User not found");    } 
//     user =  await User.findById(req.params.id).select('-password');
//     res.send(user);
// });


//router.put('/updateuser/:id',[auth, driver], async(req, res)=> {
    router.put('/updateequip/:id', async(req, res)=> {
        const equipment = await Equipment
        .findById(req.params.id);
        if (!user) return res.status(404).send("User not found");    
        equipment.equipmentname= req.body.equipmentname,
        equipment.EquipmentCategory= req.body.EquipmentCategory,
        equipment.quantity= req.body.quantity,
        equipment.Price=req.body.Price,
        equipment.Summary=req.body.Summary
        
        
        let promises = [];
        promises.push(equipment.save());
        let result = [] 
        result = await Promise.all(promises);
        res.send(equipment);
    })
    

module.exports = router;