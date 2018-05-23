const User = require('../models/user');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../config.js');

exports.getToken = function (user) {
    let data = {
        "name":user.username,
        "role":user.role
    };
    return jwt.sign(data, config.secret, {
        expiresIn: 3600
    });
};

exports.getTemporaryToken = function (user) {
    let data = {
      "name":user.username,
      "role":user.role
    };
    return jwt.sign(data, config.secret, {
        expiresIn: 1440
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    let bearer = req.body.token || req.query.token || req.headers['authorization'];
    let token = bearer.split(" ")[1].split('"').join('');
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                User.findOne({deleted: null, username: decoded.name}, (err, user) => {
                    if (err) {
                        return next(err);
                    }
                    req.decoded = {
                       "user": user._id,
                       "role": user.role,                        
                    };
                    next();
                });

            }
        });
    } else {
        // if there is no token
        // return an error
        let err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};



