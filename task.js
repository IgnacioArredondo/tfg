const express = require('express');
const Task = require('../models/task');
const User = require('../models/user');
const Project= require('../models/project')
const createError = require('http-errors');
const Verify = require('./verify');

let router = express.Router();

let rootRoute = router.route('/');

/* GET Query tasks. */
rootRoute.get(function(req, res, next) {
  let query = {
    deleted: null
  };

  const projection = {
    name: true,
    details: true,
    state: true,
    project: true,
    user:true,
    end_date:true,
    estimated_time:true,
    activities:true,
  };

  Task.find(query, projection, (err, tasks) => {
    
    if (err) {
      return next(createError(500));
    }

    return res.status(200).send(tasks);
  });

});

let checkTaskNameRoute = router.route('/checktaskname');
checkTaskNameRoute.all(Verify.verifyOrdinaryUser);
checkTaskNameRoute.get(function(req, res, next) {

    let name = req.query.name.toLowerCase();
               
     const projection =
     {
        name: true,
     };

    Task.findOne({name: new RegExp(name)}, projection, (err, task) => {
        if (err) {
            return next(createError(500));
        }

        console.log(task);
        console.log(name);


        if (task) {

            task.name=task.name.toLowerCase();

            
             if (task.name === name) {
                return res.status(401).json({
                    err: 'Task name  already exists'
                });
            }
        }

         return res.status(200).send({message: 'Task name  does not exist'});

    
   });
            
 });

/* POST create new task. */
rootRoute.post(function(req, res, next) {
  const data = req.body;

  // create new task from data
  const task = new Task({
    name: data.name,
    details: data.details,
    project: data.project,
    state: data.state,
    user: data.user,
    start_date: data.start_date,
    end_date: data.end_date,
    estimated_time: data.estimated_time,
    activities:data.activities,
  });

    
  // insert task into db
  task.save((err) => {
    if (err) {
      return next(createError(400, err));
    }
      
      return res.status(201).send(task);
    
});
});


let userTaskRoute = router.route('/user-tasks');
userTaskRoute.all(Verify.verifyOrdinaryUser);

/* GET retrieve task by id. */
userTaskRoute.get(function(req, res, next) {

  // return only these fields from the user + the _id
  const projection = {
    name: true,
    details: true,
    project: true,
    state: true,
    user: true,
    start_date: true,
    end_date: true,
    estimated_time: true,
    activities:true,
  };

//extraer usuario token y leer tareas campo user donde coincide el id
   let user=req.decoded.user;
     let query = {
      user:user,
      deleted: null
    };

     Task.find(query, projection, (err, tasks) =>
    {
        if (err)
        {
          console.log(err);
            return next(createError(500));
        }
            return res.status(200).send(tasks);  
    })
    
});

/*
--------------------------------------------------------------------------------------------------------
*/
let userDashTaskRoute = router.route('/dashboard');
userDashTaskRoute.all(Verify.verifyOrdinaryUser);

/* GET retrieve task by id. */
userDashTaskRoute.get(function(req, res, next) {

  // return only these fields from the user + the _id
  const projection = {
    name: true,
    details: true,
    project: true,
    state: true,
    user: true,
    start_date: true,
    end_date: true,
    estimated_time: true,
    activities:true,
  };

   let user=req.decoded.user;
    let query = {
      user:user,
      deleted: null
    };

     // Task.find({end_date: {"$lte":new Date()},user}

      Task.find(query,projection)
          .populate("project").then((tasks) => {
            return res.status(200).send(tasks);
 });
           
});

/*
-------------------------------------------------------------------------------------------------------
*/

let DashTaskRoute = router.route('/todotask');
DashTaskRoute.all(Verify.verifyOrdinaryUser);
DashTaskRoute.get(function(req, res, next) {
  let query = {
    deleted: null
  };

  let user=req.decoded.user;
  const projection = {
    name: true,
    
  };

    //Task.find({end_date: {"$gte":new Date()},user}, projection, (err, tasks) => {
      Task.find(query, projection, (err, tasks) => {
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
--------------------------------------------------------------------------------------------------
*/

let adminOverdueTaskRoute = router.route('/overduetask');
adminOverdueTaskRoute.all(Verify.verifyOrdinaryUser);
adminOverdueTaskRoute.get(function(req, res, next) {

  let query = {
    deleted: null
  };

  const projection = {
    name: true,
    details: true,
    project: true,
    state: true,
    user: true,
    start_date: true,
    end_date: true,
    estimated_time: true,
    activities:true,
  };

   //Task.find({end_date: {"$lte":new Date()}}, projection, (err, tasks) => {
    Task.find(query, projection)
        .populate("project").then((tasks) => {

             return res.status(200).send(tasks);
 });
});

/*
-----------------------------------------
------------------------------------------
-----------------------------------------
--------------------------------------------------------------------------------------------------
*/
let adminTaskProjectRoute = router.route('/taskproject');
adminTaskProjectRoute.all(Verify.verifyOrdinaryUser);
adminTaskProjectRoute.get(function(req, res, next) {

  let t;

   const projection = {
    name: true,
    project:true,
  }

          Task.aggregate( [
            { $match: {end_date: {"$gte":new Date()}}},
            { $group: { _id: "$project", count:{ $sum: 1}}},

          ], function(err, result) 
            {    
             console.log(result);
              Project.populate(result, {path: '_id'}, function(err, taskPopulate) 
              {
                   return res.status(200).send(taskPopulate);
              });
            
            
            });
   
});
/*
------------------------------------------------
---------------------------------------------------------
------------------------------------------------
-------------------------------------------
--------------------------------------------------------------------------------------------------
*/

let idRoute = router.route('/:id');
idRoute.all(Verify.verifyOrdinaryUser);
/* GET retrieve task by id. */
idRoute.get(function(req, res, next) {
  
  // return only these fields from the user + the _id
  const projection = {
    name: true,
    details: true,
    project: true,
    state: true,
    user: true,
    start_date: true,
    end_date: true,
    estimated_time: true,
    activities:true,
  };

  Task.findOne({
    _id: req.params.id,
    deleted: null
  }, projection, (err, task) => {
    
    if (err) {
      return next(createError(500));
    }
    
   
  }).populate('project').populate('user').exec(function(err,task)
  {

     return res.status(200).send(task);

  });

});

/* PUT update task. */
idRoute.put(function(req, res, next) {
  // the data to update with
  const data = req.body;
  
  // validate and update project
  Task.update({
    _id: req.params.id
  }, {
    $set: {
      name: data.name,
      details: data.details,
      project: data.project,
      state: data.state,
      user: data.user,
      start_date: data.start_date,
      end_date: data.end_date,
      estimated_time: data.estimated_time,
      activities:data.activities,
    }
  }, (err) => {
    if (err) {
      return next(createError(400, err));
    }
    return res.status(204).send();
  });

});

/* DELETE delete task. */
idRoute.delete(function(req, res, next) {

  Task.update({
    _id: req.params.id
  }, {
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
