var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Estiamte = require('../models/estimate');
let Invoice = require('../models/invoice');

/* GET invoices/estimates listing. */

router.post('/', function(req, res, next) {
  let invoiceToSave = req.body;
  if (req.body.userId != (null || undefined)){
    invoiceToSave = new Invoice(invoiceToSave);
  }
  else {
    invoiceToSave = new Estiamte(invoiceToSave);
  }

  invoiceToSave.save(function(err, invoice){
    res.send(invoice);
  });
});

router.get('/', function(req, res, next) {
  Invoice.find(function (err, invoices){
    if (err) return console.error(err);
    res.json(invoices);    
  });
});

router.get('/estimate', function(req, res, next) {
  Estiamte.find(function (err, estimates){
    if (err) return console.error(err);
    res.json(estimates);    
  });
});

router.get('/:id', function(req, res, next) {
  Invoice.findOne({_id: req.params["id"]}, function (err, invoice){
    if (err) return console.error(err);
    res.send(invoice);
  });
});

router.get('/user/:userId', function(req, res, next) {
  Invoice.findOne({userId: req.params["userId"]}, function (err, invoice){
    if (err) return console.error(err);
    res.send(book);
  });
});

router.get('/email/:email', function(req, res, next) {
  Invoice.findOne({email: req.params["email"]}, function (err, invoice){
    if (err) return console.error(err);
    res.send(invoice);
  });
});

router.put('/:id', function(req, res, next) {
  Book.findByIdAndUpdate({_id: req.params["id"]}, req.body, function(err, book) {
    if (err) return next(err);
    res.status(204).send();
  });
}); 

router.delete('/:id', function(req, res, next) {
  Book.deleteOne({_id: req.params["id"]}, function(err, book) {
    if (err) return next(err);
    res.status(204).send();
  });
});

module.exports = router;


