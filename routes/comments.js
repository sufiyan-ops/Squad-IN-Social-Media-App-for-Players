const express = require('express');
const router = express.Router();
const {Comment} = require('../models/comment')

router.post('/',async(req,res)=>{
    let comment = new Comment({
        comment:req.body.comment,
        player:req.body.player,
        user:req.body.userid
    })

    await comment.save();

    res.status(200).send({message:"Comment added"});
})

router.get('/',async(req,res)=>{
    let comment = await Comment.find()

    

    res.status(200).send(comment);
})

router.get('/:playerid',async(req,res)=>{
    let comment = await Comment.find({player:req.params.playerid})
    
    res.send(comment);
})

module.exports = router;