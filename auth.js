const express = require('express');
const User = require('../models/user');
const createError = require('http-errors');
const passport = require('passport');
const Verify = require('./verify');
const nodemailer = require('nodemailer');
const config = require('../config');
const jwt = require('jsonwebtoken');

let router = express.Router();

let registerRoute = router.route('/register');

registerRoute.post(function(req, res) {
    User.register(new User({ username : req.body.username, email: req.body.email, role:req.body.role }),

        req.body.password, function(err, user) {
            if (err) {
                return res.status(500).json({err: err});
            }
        
            passport.authenticate('local')(req, res, function () {
                let token = Verify.getTemporaryToken(user);
                
              /*   res.status(200).json({
                    token: token
                });*/
                return res.status(200).send({message: 'user registered', token: token});
            });
        });
});


let loginRoute = router.route('/login');

loginRoute.post(function(req, res, next) {

    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }

        if (!user.enabled) {
            return res.status(432).json({
                err: {message : 'user not enabled'}
            });
        }

        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            let token = Verify.getToken(user);
            let userData = {_id: user._id, username: user.username, email: user.email};
            res.status(200).json({
                token: token,
                user: userData
            });
        });
    })(req,res,next);

});

let checkEmailRoute = router.route('/checkemail');

checkEmailRoute.get(function(req, res, next) {

    let email = req.query.email.toLowerCase();

    User.findOne({deleted: null, email: email}, (err, user) => {
        if (err) {
            return next(err);
        }


        if (user) {
            if (user.email === email) {
                return res.status(401).json({
                    err: 'Email already exists'
                });
            }
        }
        return res.status(200).send({message: 'email does not exist'});
    });

});


let checkUsernameRoute = router.route('/checkusername');

checkUsernameRoute.get(function(req, res, next) {

    let username = req.query.username.toLowerCase();

    User.findOne({deleted: null, username: username}, (err, user) => {
        if (err) {
            // return next(createError(500));
            return next(err);
        }

        if (user) {
            if (user.username === username) {
                return res.status(401).json({
                    err: 'Username already exists'
                });
            }
        }
        return res.status(200).send({message: 'username does not exist'});
    });
});


let sendConfirmEmailRoute = router.route('/sendemail');

sendConfirmEmailRoute.post(function(req, res) {

    let transporter = nodemailer.createTransport({
        host: 'smtp1.servage.net',
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
     auth: {
        user: 'pkplanning@viacoreit.com',
        pass: '..PKPlanning01',
     }
    });

    let html = '¡Bienvenid@, ' + req.body.name + '! \n\n Haga clic en el siguiente enlace para confirmar su registro \n\n [[ enlace de confirmación ]]' + req.body.token;

    let mailOptions = {
        from: 'pkplanning@viacoreit.com',
        to: req.body.sendTo,
        subject: 'Confirmación de registro',
        html: '¡Bienvenid@, ' + req.body.name + '! \n\n Haga clic <a href = '+ config.frontendEndpoint + '/#/auth/confirm?token=' + req.body.token + '>aquí</a> para confirmar su registro '
     
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        } else {
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        }
    });

});

let confirmAccountRoute = router.route('/confirm');

confirmAccountRoute.put(function(req, res, next) {

    let token = req.body.token;

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                err = new Error('Error in token');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                // req.decoded = decoded;
                // next();
                // se extrae el usuario del token
                let payload = jwt.decode(token, config.secret);
                let userId = payload.doc._id;

                User.update({_id: userId}, {
                    $set: {
                        enabled: true
                    }
                }, (err) => {
                    if (err) {
                        return next(createError(400, err));
                    }

                    return res.status(204).send();
                });
            }
        });

    }

});

let restorePwdRoute = router.route('/restore-password');

restorePwdRoute.post(function(req, res, next) {
    let token = req.body.token;
    let newPassword = req.body.newPassword;

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                err = new Error('Error in token');
                err.status = 401;
                return next(err);
            } else {
                // se extrae el usuario del token
                let payload = jwt.decode(token, config.secret);

                User.findOne({username: payload.name}, (err, user) => {
                    if (err) {
                        return next(err);
                    }

                    user.setPassword(newPassword, (err) => {
                        if (err) {
                            return next(err);
                        }
                        user.save();
                        return res.status(200).send({message: 'password changed'});
                    });
                });
            }
        });
    }
});


module.exports = router;
