const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment:{
        type: String,
        minlength:3
    },
    player:{
        type: String
    },
    user:{
        type: String
    }
})

const Comment = mongoose.model('Comment',commentSchema);

module.exports.Comment = Comment;