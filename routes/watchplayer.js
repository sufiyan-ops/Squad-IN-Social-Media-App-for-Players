const config = require('config');
const jwt = require("jsonwebtoken");
const express = require('express');
const {watchplayer,validate} = require('../models/watchplayer');

const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const auth =  require('../middleware/auth');
const player =  require('../middleware/player');
const organizer=require('../middleware/organizer');
const recruiter=require('../middleware/recruiter');

router.get('/',async (req, res) => {
    const stat = await watchplayer.find();
    res.send(watchplayer);
});