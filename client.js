const express = require('express');
const Client = require('../models/client');
const createError = require('http-errors');
const Verify = require('./verify');

let router = express.Router();

let rootRoute = router.route('/');

let checkClientNameRoute = router.route('/checkclientname');
//checkClientNameRoute.all(Verify.verifyOrdinaryUser);
checkClientNameRoute.get(function(req, res, next) {

    let name = req.query.name.toLowerCase();
      
         
     const projection =
     {
        name: true,
     };

    Client.findOne({name: new RegExp(name)}, projection, (err, client) => {
        if (err) {
            return next(createError(500));
        }

        console.log(client);
        console.log(name);


        if (client) {

            client.name=client.name.toLowerCase();

            
             if (client.name === name) {
                return res.status(401).json({
                    err: 'Client name  already exists'
                });
            }
        }

         return res.status(200).send({message: 'Client name  does not exist'});

    
   });
        /*
    Client.findOne({name: req.query.name, deleted: null}, (err, client) => {

        if (err) {
            // return next(createError(500));
            return next(err);
        }

        name=name.toLowerCase();
        console.log(client);
        
        if (client) {

            client.name=client.name.toLowerCase();
            console.log(client.name);
            if (client.name === name) {
                return res.status(401).json({
                    err: 'Client name  already exists'
                });
            }
        }
                
        return res.status(200).send({message: 'Client name  does not exist'});
    });*/
});


/* GET Query clients. */
rootRoute.get(function(req, res, next) {
    let query = {
        deleted: null
    };

    const projection = {
        name: true,
        nif: true,
        contact:true,
        email:true,
        phone_number:true,
        type:true,
    };

    Client.find(query, projection, (err, clients) => {
        if (err) {
            return next(createError(500));
        }

        return res.status(200).send(clients);
    });

});

/* POST create new client. */
rootRoute.post(function(req, res, next) {
    const data = req.body;

    // create new client from data
    const client = new Client({
        name: data.name,
        nif: data.nif,
        contact:data.contact,
        email:data.email,
        phone_number:data.phone_number,
        type:data.type,
    });

    // insert client into db
    client.save((err) => {
        if (err) {
            return next(createError(400, err));
        }

        return res.status(201).send(client);
    });

});
let idRoute = router.route('/:id');

/* GET retrieve client by id. */
idRoute.get(function(req, res, next) {

    // return only these fields from the user + the _id
    const projection = {
        name: true,
        nif: true,
        contact:true,
        email:true,
        phone_number:true,
        type:true,
    };

    Client.findOne({_id: req.params.id, deleted: null}, projection, (err, client) => {
        if (err) {
            return next(createError(500));
        }
        return res.status(200).send(client);
    });

});

/* PUT update client. */
idRoute.put(function(req, res, next) {
    // the data to update with
    const data = req.body;

    // validate and update client
    Client.update({_id: req.params.id}, {
        $set: {
                name: data.name,
                nif: data.nif,
                contact:data.contact,
                email:data.email,
                phone_number:data.phone_number,
                type:data.type,
              }
    }, (err) => {
        if (err) {
            return next(createError(400, err));
        }
        return res.status(204).send();
    });

});

/* DELETE delete client. */
idRoute.delete(function(req, res, next) {

    Client.update({_id: req.params.id}, {
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



module.exports = router;
