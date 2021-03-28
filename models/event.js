const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require('config');

const eventSchema = new mongoose.Schema({
    eventname: {
        type:String,
        required: true,
        minlength:5,
        maxlength:50
    },
    EventCategory: {
        type: String,
        required: true,
       
    },
    eventDate: {
        type: String,
        required: true
    },
    eventtime: {
        type: String,
        required: true,
     },
     Summary: {
        type: String,
        required: true,
     },

    

    
})

function validateEvent(event) {
    const schema = {
        eventname: Joi.string().required(),
        EventCategory: Joi.string().required(),
        eventDate: Joi.string().required(),
        eventtime: Joi.string().required(),
        Summary:Joi.string().required(),
    
    };
    return Joi.validate(event, schema);
}

const Event = mongoose.model('Event', eventSchema);



exports.Event = Event;
exports.validate = validateEvent;