const express = require('express');
const Project = require('../models/project');
const createError = require('http-errors');
const Verify = require('./verify');
let router = express.Router();

let rootRoute = router.route('/');


let checkProjectNameRoute = router.route('/checkprojectname');
checkProjectNameRoute.all(Verify.verifyOrdinaryUser);
checkProjectNameRoute.get(function(req, res, next)
{
    let title = req.query.name.toLowerCase();
  
    console.log(req.query.name.toLowerCase());
               
     const projection =
     {
        title: true,
     };

    Project.findOne({title: new RegExp(title)}, projection, (err, project) => {
        if (err) {
            return next(createError(500));
        }

        console.log(project);
       
        if (project) {

            project.title=project.title.toLowerCase();

            console.log(project.title);
            console.log(title);
            
             if (project.title === title) {
                return res.status(401).json({
                    err: 'Project name  already exists'
                });
            }
        }

         return res.status(200).send({message: 'Project name  does not exist'});
      
    });
});
/* GET Query projects. */
rootRoute.get(function(req, res, next) {
    let query = {
        deleted: null
    };

    const projection = {
        title: true,
        description: true,
        ending_date:true,
    };

    Project.find(query, projection, (err, projects) => {
        if (err) {
            return next(createError(500));
        }

        return res.status(200).send(projects);
    });

});


/* POST create new project. */
rootRoute.post(function(req, res, next) {
    const data = req.body;

    // create new project from data
    const project = new Project({
        title: data.title,
        description: data.description,
        repository: data.repository,
        client: data.client,
        start_date: data.start_date,
        ending_date: data.ending_date,
        technologies: data.technologies,
        budget: data.budget
    });
  
    // insert project into db
    project.save((err) => {
        if (err) {
            return next(createError(400, err));
        }

        return res.status(201).send(project);
    });

});

/*
---------------------------------------------------------------------------------------------------------
*/

let DashTaskRoute = router.route('/todoproject');
DashTaskRoute.all(Verify.verifyOrdinaryUser);
DashTaskRoute.get(function(req, res, next) {
   
  const projection = {
    name: true,
  };

    Project.find({ending_date: {"$gte":new Date()}}, projection, (err, projects) => {
     if (err)
        {
            console.log(err);
            return next(createError(500));
        }
                  
    }).count(function(err, count){

      console.log(count);
       
      return res.status(200).send(String(count));
      
});
});

/*
--------------------------------------------------------------------------------------------------------
*/



let idRoute = router.route('/:id');


/* GET retrieve project by id. */
idRoute.get(function(req, res, next) {

    // return only these fields from the user + the _id
    const projection = {
        title: true,
        description: true,
        repository: true,
	    client: true,
	    start_date: true,
        ending_date: true,
	    technologies: true,
	    budget: true,
    };


    Project.findOne({_id: req.params.id, deleted: null}, projection, (err, project) => {
        
        if (err) {
            return next(createError(500));
        }
           
  }).populate('client').exec(function(err,project)
  {

     return res.status(200).send(project);

  });
        

});

/* PUT update project. */
idRoute.put(function(req, res, next) {
    // the data to update with
    const data = req.body;

    // validate and update project
    Project.update({_id: req.params.id}, {
        $set: {
            title: data.title,
            description: data.description,
            repository: data.repository,
            client: data.client,
            start_date: data.start_date,
            ending_date: data.ending_date,
            technologies: data.technologies,
            budget: data.budget
        }
    }, (err) => {
        if (err) {
            return next(createError(400, err));
        }
        return res.status(204).send();
    });

});

/* DELETE delete project. */
idRoute.delete(function(req, res, next) {

    Project.update({_id: req.params.id}, {
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
