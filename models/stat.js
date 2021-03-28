const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require('config');

const statSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name: {
        type:String,
        required: true,
        minlength:5,
        maxlength:50,
        
    },
    SportsCategory: {
        type: String,
        required: true,
       
    },
    matches: {
        type: String,
        required: true
    },
    Performance: {
        type: String,
        required: true,
     },
     Summary: {
        type: String,
        required: true,
     },

    

    
})

function validateStat(stat) {
    const schema = {
        id:Joi.string().required(),
        name: Joi.string().required(),
        SportsCategory: Joi.string().required(),
        matches: Joi.string().required(),
        Performance: Joi.string().required(),
        Summary:Joi.string().required(),
    
    };
    return Joi.validate(stat, schema);
}

const Stat = mongoose.model('Stat', statSchema);



exports.Stat = Stat;
exports.validate = validateStat;