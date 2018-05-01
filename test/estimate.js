let mongoose = require("mongoose");
let Estimate = require('../models/estimate');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let http = require('http');

let server = http.createServer(app);
let should = chai.should();

chai.use(chaiHttp);

describe('Estimates', () => {
  before(done => {
    server.listen(0);
    done();
  }); 
  beforeEach(done => {
    Estimate.remove({}, (err) => {
      done();
    });
  });

  after(done => {
    server.close();
    done();
  });

  describe('GET /api/estimate', () => {
    it ('should GET all the estimates', (done)=>{
      let expectedEstimate = new Estimate({
        "email": "email@test.com",
        "services": [ 
          {"title":"file uploading", "period":3},
          {"title":"user invitation emails", "period":3}
        ],
        "cost": 600,
        "period": 6
      });


      expectedEstimate.save(function (err, estimate) {
        if (err) return console.error(err);
        chai.request(server)
            .get('/api/estimate')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(1);
              done();
            });
      });
    });
  });

  describe('GET /api/estimate/:id', () => {
    it ('should get an existing estimate', (done)=>{
      let existingEstimate = new Estimate({
        "email": "email@test.com",
        "services": [ 
          {"title":"file uploading", "period":3},
          {"title":"user invitation emails", "period":3},
          {"title":"file uploading", "period":3}
        ],
        "cost": 900,
        "period": 9
      });

      existingEstimate.save(function (err, estimate){
        chai.request(server)
            .get('/api/estimate/' + estimate.id)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
                res.body.should.have.property("email").eql(existingEstimate.email);
                res.body.should.have.property("services").eql(existingEstimate.services);
                res.body.should.have.property("cost").eql(existingEstimate.cost);
                res.body.should.have.property("period").eql(existingEstimate.period);
              done();
            });
      });
    });
  });

  describe('GET /api/email/:email', () => {
    it ('should get an existing estimate for a user', (done)=>{
      let existingEstimate = new Estimate({
        "email": "jonnSnow@gmail.com",
        "services": [ 
          {"title":"file uploading", "period":3},
          {"title":"user invitation emails", "period":3},
          {"title":"file uploading", "period":3}
        ],
        "cost": 900,
        "period": 9
      });

      existingEstimate.save(function (err, estimate){
        chai.request(server)
            .get('/api/estimate/email/' + estimate.email)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(1);
              done();
            });
      });
    });
  });

  describe('POST /api/estimate', () => {
    it ('should add a new estimate', (done)=>{
      let expectedEstimate = new Estimate({
        "email": "email@test.com",
        "services": [ 
          {"title":"file uploading", "period":3},
          {"title":"user invitation emails", "period":3},
          {"title":"file uploading", "period":3}
        ],
        "cost": 900,
        "period": 9
      });

      chai.request(server)
        .post('/api/estimate')
        .send(expectedEstimate)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property("email").eql(expectedEstimate.email);
          res.body.should.have.property("services").eql(expectedEstimate.services);
          res.body.should.have.property("cost").eql(expectedEstimate.cost);
          res.body.should.have.property("period").eql(expectedEstimate.period);
          done();
        });
    });
  });

  describe('PUT /api/estimate/:id', () => {
    it ('should update an existing estimate', (done)=>{
      let existingEstimate = new Estimate({
        "email": "email@test.com",
        "services": [ 
          {"title":"file uploading", "period":3},
          {"title":"user invitation emails", "period":3},
          {"title":"file uploading", "period":3}
        ],
        "cost": 900,
        "period": 9
      });

      let expectedEstimate = new Estimate({
        "email": "email@test.com",
        "services": [ 
          {"title":"file uploading", "period":3},
          {"title":"user invitation emails", "period":3}
        ],
        "cost": 600,
        "period": 6
      });

      existingEstimate.save(function (err, estimate){
        if (err) return console.error(err);
        console.log(estimate);
        chai.request(server)
            .put('/api/estimate/' + estimate.id)
            .send(expectedEstimate)
            .end((err, res) => {
              res.should.have.status(204);
              res.body.should.be.empty;

              Estimate.findOne({_id: estimate.id}, function(err, foundEstimate) {
                if (err) return console.error(err);
                foundEstimate.should.be.a('object');
                foundEstimate.should.have.property("email").eql(expectedEstimate.email);
                foundEstimate.should.have.property("services").eql(expectedEstimate.services);
                foundEstimate.should.have.property("cost").eql(expectedEstimate.cost);
                foundEstimate.should.have.property("period").eql(expectedEstimate.period);
                done();
              });
          });
        });
    });
  });
  

  describe('DELETE /api/estimate/:id', () => {
    it ('should delete an existing estimate', (done)=>{
      let existingEstimate = new Estimate({
        "email": "email@test.com",
        "services": [ 
          {"title":"file uploading", "period":3},
          {"title":"user invitation emails", "period":3}
        ],
        "cost": 600,
        "period": 6
      });


      existingEstimate.save(function (err, estimate){
        if (err) return console.error(err);
        chai.request(server)
            .delete('/api/estimate/' + estimate.id)
            .end((err, res) => {
              res.should.have.status(204);
              res.body.should.be.empty;

              Estimate.findOne({_id: existingEstimate.id}, function(err, estimate) {
                if (err) return console.error(err);
                should.not.exist(estimate);
                done();
              });
             });
        });
      });
  });

});