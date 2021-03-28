const config = require('config');
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const router = express.Router();

router.post('/', async (req, res)=>{
    console.log(1);
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(200).send({"message":"Invalid user or password!"});
    console.log(user.password);
    await bcrypt.compare(req.body.password, user.password)
    .then((validPassword)=> { 
        if (validPassword) {
            const token = user.generateAuthToken();
            res.status(200).send({"token":token});  
        }
        else 
            return res.status(200).send({"message":"Invalid user or password!"});})
    .catch((error)=>{ return res.status(400).send(error);})
})

function validate (req) {
    const schema = {
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(req,schema);
}

module.exports = router; 