const Message = require('../models/message');
const express = require('express');
const router = express.Router();

router.post('/add',async(req,res)=>{
    const message = new Message({
        Name: req.body.Name,
        email: req.body.email,
        message: req.body.message,
        room: req.body.room,
        date: req.body.date,
        time: req.body.time
    });
    await message.save();
})

router.get('/:room1',async(req,res)=>{
    var message = await Message.find({room:req.params.room1});
    res.send(message); 
})

module.exports = router;