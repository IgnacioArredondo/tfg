const express = require('express');
const User = require('../models/user');
const createError = require('http-errors');
const passport = require('passport');
const Verify = require('./verify');

let router = express.Router();

let rootRoute = router.route('/');
rootRoute.all(Verify.verifyOrdinaryUser);

/* GET Query users. */
rootRoute.get(function(req, res, next) {
    let query = {
        deleted: null
    };

    if (req.query.username) {
        query.username = req.query.username.toLowerCase();
    }

    if (req.query.email) {
        query.email = req.query.email.toLowerCase();
    }

    // return only these fields from the user + the _id
    const projection = {
        username: true,
        email: true,
        role:true,
        createdAt: true
    };

    User.find(query, projection, (err, user) => {
        if (err) {
            return next(createError(500));
        }

        return res.status(200).send(user);
    });

});


let checkEmailRoute = router.route('/checkemail');
checkEmailRoute.all(Verify.verifyOrdinaryUser);

checkEmailRoute.get(function(req, res, next) {

    let email = req.query.email.toLowerCase();

    User.findOne({deleted: null, email: email}, (err, user) => {
        if (err) {
            // return next(createError(500));
            return next(err);
        }

        if (user) {
            if (user._id != req.query.userId) {
                // return next(createError(400, 'Email already exists'));
                return res.status(401).json({
                    err: 'Email already exists'
                });
            }
        }
        return res.status(200).send({message: 'email does not exist'});
    });

});


let changePasswordRoute = router.route('/changepassword');
changePasswordRoute.all(Verify.verifyOrdinaryUser);

/* POST change password */
changePasswordRoute.post(function(req, res, next) {

    // find the user
      User.findOne({_id: req.body.userId}, function (err, user) {
        if (err) {
            return next(err);
        }

        user.setPassword(req.body.password, function (err) {
            if (err) {
            return next(err);
        }
        
        // user._id = '';
        user.save();
        
        return res.status(200).send({message: 'password changed'});

        });

    });

});

/* POST create new user. */
rootRoute.post(function(req, res, next) {
    const data = req.body;

    // create new user from data
    const user = new User({
        username: data.username,
        email: data.email,
        password:data.password,
        role:data.role,
    });

    // insert user into db
    user.save((err) => {
        if (err) {
            return next(createError(400, err));
        }

        return res.status(201).send(user);
    });

});


let idRoute = router.route('/:id');
idRoute.all(Verify.verifyOrdinaryUser);

/* GET retrieve user by id. */
idRoute.get(function(req, res, next) {

    // return only these fields from the user + the _id
    const projection = {
        username: true,
        userPassword: true,
        email: true,
        role:true,
        createdAt: true
    };

    User.findOne({_id:  req.params.id, deleted: null}, projection, (err, user) => {
        if (err) {
            return next(createError(500));
        }
        return res.status(200).send(user);
    });

});

/* PUT update user. */
idRoute.put(function(req, res, next) {
    // the data to update with
    const data = req.body;

    // validate and update user
    User.update({_id: req.params.id}, {
        $set: {
            username: data.username,
            email: data.email ? data.email.toLowerCase() : undefined,
            userPassword: data.userPassword,
            role:data.role,
        }
    }, (err) => {
        if (err) {
            return next(createError(400, err));
        }
        return res.status(204).send();
    });

});

/* DELETE delete user. */
idRoute.delete(function(req, res, next) {

    User.update({_id: req.params.id}, {
        $set: {
            deleted: new Date()
        }
    }, (err) => {
        if (err) {
            return next(createError(400, err));
        }
        return res.status(204).send();
    });

});


let logoutRoute = router.route('/logout');

logoutRoute.get(function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});


module.exports = router;
