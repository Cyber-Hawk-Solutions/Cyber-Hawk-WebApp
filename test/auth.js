"use strict";

"use strict";

let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let http = require('http');
let User = require('../models/user');

let server = http.createServer(app);
let should = chai.should();

chai.use(chaiHttp);

describe('auth', () => {
  before(done => {
    // Start the server
    server.listen(0);
    done();
  });

  beforeEach(done => { 
    // Before each test we empty the database
    User.remove({}, (err) => { 
      done();         
    });     
  });

  after(done => {
  // After all tests we close the server and disconnect from the database
  server.close();
  done();
  });

  describe('GET /signup', () => {
    it('it should GET signup data', (done) => {
    	let expectedUser = new User({
            username: "dan",
            password: "welcome"
    	})

    	expectedUser.save(function (err, book) {
  	      if (err) return console.error(err);
          chai.request(server)
              .get('/signup')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(1);
                done();
              });
  	  });
    });
  });

  describe('POST /signup', () => {
    it('it should add a new user', (done) => {
    	let expectedUser = new User({
            username: "dan",
            password: "welcome"
    	})


      chai.request(server)
          .post('/signup')
          .send(expectedUser)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property("username").eql(expectedUser.username);
            res.body.should.have.property("password").eql(expectedUser.password);
            done();
          });
    });
  }); 

/*
  describe('GET /books/:id', () => {
    it('it should get an existing book', (done) => {
      let existingBook = new Book({
    		title:"greenest grass",
    		author: "Dwight",
    		numPages: 7
    	});

      existingBook.save(function (err, book) {
        if (err) return console.error(err);
        chai.request(server)
          .get('/books/' + book.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property("id");
            res.body.should.have.property("title").eql(existingBook.title);
            res.body.should.have.property("author").eql(existingBook.author);
            res.body.should.have.property("numPages").eql(existingBook.numPages);
            done();
          });
      });
    });
  });

  describe('PUT /books/:id', () => {
    it('it should update an existing book', (done) => {
      let existingBook = new Book({
    		title:"greenest grass",
    		author: "Dwight",
    		numPages: 7
    	});
      
      let expectedBook = new Book({
        title: existingBook.title,
        author: existingBook.author,
        numPages: existingBook.numPages
      });

      existingBook.save(function (err, book) {
        if (err) return console.error(err);
        chai.request(server)
          .put('/books/' + book.id)
          .send(expectedBook)
          .end((err, res) => {
            res.should.have.status(204);
            res.body.should.be.empty;

            Book.findOne({_id: existingBook.id}, function(err, foundBook) {
              if (err) return console.error(err);
              foundBook.should.have.property("title").eql(expectedBook.name);
              foundBook.should.have.property("author").eql(expectedBook.author);
              foundBook.should.have.property("numPages").eql(expectedBook.numPages);
              done();
            })
          });
      });
    });
  });

  describe('DELETE /books/:id', () => {
    it('it should delete an existing book', (done) => {
      let existingBook = new Book({
    		title:"greenest grass",
    		author: "Dwight",expectedBook
    		numPages: 7
    	});

      existingBook.save(function (err, book) {
        if (err) return console.error(err);
        chai.request(server)
          .delete('/books/' + book.id)
          .end((err, res) => {
            res.should.have.status(204);
            res.body.should.be.empty;

            Book.findOne({_id: existingBook.id}, function(err, book) {
              if (err) return console.error(err);
              should.not.exist(book);
              done();
            })
          });
      });
    });
  });
*/
});
