const jwt = require("jsonwebtoken");
const authConfig = require('../config/keys');

// Authentication middleware using JWT
module.exports = (req, res, next) => {

    
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log('No token provided');
        
        return res.status(401).send({
            error: 'No token provided'
        });
    }

    // Bearer some_hash
    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        console.log('Token error');
        return res.status(401).send({
            error: 'Token error'
        });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        console.log('Token mal-formatted');
        
        return res.status(401).send({
            error: 'Token mal-formatted'
        });
    }

    jwt.verify(token, authConfig.jwtSecret, (err, decoded) => {
        if (err) {
            console.log('Token invalid');
        
            return res.status(401).send({
                error: 'Token invalid'
            });
        }

        req.userId = decoded.id;
        return next();
    });

};