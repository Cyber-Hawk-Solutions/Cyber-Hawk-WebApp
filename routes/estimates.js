var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Estimate = require('../models/estimate');

/* GET estimates/estimates listing. */

router.post('/', function(req, res, next) {
  let estimateToSave = req.body;
  if (req.body.email == (null || undefined)){
    return console.error("email missing.");
  }
  
  estimateToSave = new Estimate(estimateToSave);
  estimateToSave.save(function(err, estimate){
    res.send(estimate);
  });
});

router.get('/', function(req, res, next) {
  Estimate.find(function (err, estimates){
    if (err) return console.error(err);
    res.json(estimates);    
  }).sort('descending');
});


router.get('/:id', function(req, res, next) {
  Estimate.findOne({_id: req.params["id"]}, function (err, estimate){
    if (err) return console.error(err);
    res.send(estimate);
  });
});

router.get('/user/:userId', function(req, res, next) {
  Estimate.find({userId: req.params["userId"]}, function (err, estimate){
    if (err) return console.error(err);
    res.send(estimate);
  }).sort('descending');
});

router.get('/email/:email', function(req, res, next) {
  Estimate.find({email: req.params["email"]}, function (err, estimates){
    if (err) return console.error(err);
    res.send(estimates);
  }).sort('descending');
});

router.put('/:id', function(req, res, next) {
  Estimate.findByIdAndUpdate({_id: req.params["id"]}, req.body, function(err, estimate) {
    if (err) return next(err);
    res.status(204).send();
  });
}); 

router.delete('/:id', function(req, res, next) {
  Estimate.deleteOne({_id: req.params["id"]}, function(err, estimate) {
    if (err) return next(err);
    res.status(204).send();
  });
});

module.exports = router;


