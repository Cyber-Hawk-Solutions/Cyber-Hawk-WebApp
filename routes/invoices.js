var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Estiamte = require('../models/estimate');
let Invoice = require('../models/invoice');

/* GET books listing. */

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
  Book.find(function (err, books){
    if (err) return console.error(err);
    res.json(books);    
  });
});

router.get('/:id', function(req, res, next) {
  Book.findOne({_id: req.params["id"]}, function (err, book){
    if (err) return console.error(err);
    res.send(book);
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


