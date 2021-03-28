const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied. Token not provided');

    try {
        const decodedToken = jwt.verify(token, config.get('jwtPrivateKey'));
        req.userdata =  { _id: decodedToken._id,name:decodedToken.name ,userType: decodedToken.userType,email:  decodedToken.email};
        next();
        
    }
    catch(ex){
        res.status(400).send('Invalid token');
    }


}