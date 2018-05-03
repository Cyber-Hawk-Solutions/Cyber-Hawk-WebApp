let mongoose = require("mongoose");
let Invoice = require('../models/invoice');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let http = require('http');

let server = http.createServer(app);
let should = chai.should();

chai.use(chaiHttp);

describe('Invoices', () => {
  before(done => {
    server.listen(0);
    done();
  }); 
  beforeEach(done => {
    Invoice.remove({}, (err) => {
      done();
    });
  });

  after(done => {
    server.close();
    done();
  });

  describe('GET /api/invoice', () => {
    it ('should GET all the invoices', (done)=>{
      let expectedInvoice = new Invoice({
        "userId": "5ae7f66223fea12114ab72f1",
        "services": [ 
          {"title":"file uploading", "period":3},
          {"title":"user invitation emails", "period":3}
        ],
        "cost": 600,
        "period": 6
      });


      expectedInvoice.save(function (err, invoice) {
        if (err) return console.error(err);
        chai.request(server)
            .get('/api/invoice')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(1);
              done();
            });
      });
    });
  });

  describe('GET /api/user/:userId', () => {
    it ('should get an existing invoice for a user', (done)=>{
      let existingInvoice = new Invoice({
        "userId": "5ae7f66223fea12114ab72f1",
        "services": [ 
          {"title":"file uploading", "period":3},
          {"title":"user invitation emails", "period":3},
          {"title":"file uploading", "period":3}
        ],
        "cost": 900,
        "period": 9
      });

      existingInvoice.save(function (err, invoice){
        chai.request(server)
            .get('/api/invoice/user/' + invoice.userId)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(1);
              done();
            });
      });
    });
  });

  describe('GET /api/invoice/:id', () => {
    it ('should get an existing invoice', (done)=>{
      let existingInvoice = new Invoice({
        "userId": "5ae7f66223fea12114ab72f1",
        "services": [ 
          {"title":"file uploading", "period":3},
          {"title":"user invitation emails", "period":3},
          {"title":"file uploading", "period":3}
        ],
        "cost": 900,
        "period": 9
      });

      existingInvoice.save(function (err, invoice){
        chai.request(server)
            .get('/api/invoice/' + invoice.id)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
                res.body.should.have.property("userId").eql(existingInvoice.userId);
                res.body.should.have.property("services").eql(existingInvoice.services);
                res.body.should.have.property("cost").eql(existingInvoice.cost);
                res.body.should.have.property("period").eql(existingInvoice.period);
              done();
            });
      });
    });
  });

  describe('POST /api/invoice', () => {
    it ('should add a new invoice', (done)=>{
      let expectedInvoice = new Invoice({
        "userId": "5ae7f66223fea12114ab72f1",
        "services": [ 
          {"title":"file uploading", "period":3},
          {"title":"user invitation emails", "period":3},
          {"title":"file uploading", "period":3}
        ],
        "cost": 900,
        "period": 9
      });

      chai.request(server)
        .post('/api/invoice')
        .send(expectedInvoice)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property("userId").eql(expectedInvoice.userId);
          res.body.should.have.property("services").eql(expectedInvoice.services);
          res.body.should.have.property("cost").eql(expectedInvoice.cost);
          res.body.should.have.property("period").eql(expectedInvoice.period);
          done();
        });
    });
  });

  describe('PUT /api/invoice/:id', () => {
    it ('should update an existing invoice', (done)=>{
      let existingInvoice = new Invoice({
        "userId": "5ae7f66223fea12114ab72f1",
        "services": [ 
          {"title":"file uploading", "period":3},
          {"title":"user invitation emails", "period":3},
          {"title":"file uploading", "period":3}
        ],
        "cost": 900,
        "period": 9
      });

      let expectedInvoice = new Invoice({
        "userId": "5ae7f66223fea12114ab72f1",
        "services": [ 
          {"title":"file uploading", "period":3},
          {"title":"user invitation emails", "period":3}
        ],
        "cost": 600,
        "period": 6
      });

      existingInvoice.save(function (err, invoice){
        if (err) return console.error(err);
        chai.request(server)
            .put('/api/invoice/' + invoice.id)
            .send(expectedInvoice)
            .end((err, res) => {
              res.should.have.status(204);
              res.body.should.be.empty;

              Invoice.findOne({_id: invoice.id}, function(err, foundInvoice) {
                if (err) return console.error(err);
                foundInvoice.should.be.a('object');
                foundInvoice.should.have.property("userId").eql(expectedInvoice.userId);
                foundInvoice.should.have.property("services").eql(expectedInvoice.services);
                foundInvoice.should.have.property("cost").eql(expectedInvoice.cost);
                foundInvoice.should.have.property("period").eql(expectedInvoice.period);
                done();
              });
          });
        });
    });
  });

  describe('DELETE /api/invoice/:id', () => {
    it ('should delete an existing invoice', (done)=>{
      let existingInvoice = new Invoice({
        "userId": "5ae7f66223fea12114ab72f1",
        "services": [ 
          {"title":"file uploading", "period":3},
          {"title":"user invitation emails", "period":3}
        ],
        "cost": 600,
        "period": 6
      });


      existingInvoice.save(function (err, invoice){
        if (err) return console.error(err);
        chai.request(server)
            .delete('/api/invoice/' + invoice.id)
            .end((err, res) => {
              res.should.have.status(204);
              res.body.should.be.empty;

              Invoice.findOne({_id: existingInvoice.id}, function(err, invoice) {
                if (err) return console.error(err);
                should.not.exist(invoice);
                done();
              });
             });
        });
      });
  });

});