
module.exports = function (req, res, next) { 
    // 401 Unauthorized
    // 403 Forbidden 
    console.log(req.userdata.userType.toLowerCase().toString())
    if (!(req.userdata.userType.toLowerCase().toString() == "player")) return res.status(403).send('Access denied.');
    next();
  }