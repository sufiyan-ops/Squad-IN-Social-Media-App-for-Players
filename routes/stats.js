const config = require('config');
const jwt = require("jsonwebtoken");
const express = require('express');
const {Stat,validate} = require('../models/stat');

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
   
    stat = new Stat({ 
        id: req.body.id,
        name: req.body.name,
        SportsCategory: req.body.SportsCategory,
        matches: req.body.matches,
        Performance: req.body.Performance,
        Summary: req.body.Summary,

    });

    await stat.save();
    
    res.send(_.pick(stat, ["_id","name","SportsCategory","Performance","Summary"]));
    //res.header('x-auth-token', token).send(_.pick(user, ["_id","name","email","userType"]));
})


router.get('/mystats/:id', async(req, res)=> {
    //if(!req.params.id) return res.status(400).send("No ID provided");
    let stat = await Stat.find ( { id:req.params.id })
    res.send(stat);
})

router.post('/sport', async(req, res)=> {
    //if(!req.params.id) return res.status(400).send("No ID provided");
    let stat = await Stat.find ( { id:req.body.id, SportsCategory:req.body.sports })
    res.send(stat);
})

router.get('/me',async (req, res) => {
    const stat = await Stat.find();
    res.send(stat);
});



    router.put('/updatestat/:id', async(req, res)=> {
        const stat = await Stat
        .findById(req.params.id);
        if (!user) return res.status(404).send("User not found");    
        stat.fullname = req.body.fullname,
        stat.SportsCategory = req.body.SportsCategory,
        stat.matches = user.matches,
        stat.Performance = req.body.Performance,
        stat.Summary= req.body.Summary
        
        
        let promises = [];
        promises.push(stat.save());
        let result = [] 
        result = await Promise.all(promises);
        res.send(stat);
    })
    

module.exports = router;