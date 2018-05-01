var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
let mongoose = require('mongoose');
var pug = require('pug');

var account = { 'email': 'cyberhawktestemail@gmail.com', 'password': 'Password100'};

// create reusable transporter object using the default SMTP transport
var estimate = {
  period: 30,
  dayRate: 50,
  items: [
    {title: 'Maps', period: 10},
    {title: 'Push Notifications', period: 20}

  ]
};

router.post('/estimate',function(req,res,next){

  let estimate = req.body;
  let sendToEmail = estimate.email;

  const mailer = require('pug-mailer');
   
  mailer.init({
    service: 'gmail',
    auth: {
      user: account.email,
      pass: account.password
    }
  });
   
  mailer.send({
    from: '"Cyber Hawk Inc." <*******@gmail.com>',
    to: sendToEmail,
    subject: 'Here\'s your generated estimate ✔',
   
    // You may also pass the full path to the PugJS template file. 
    template: '../../views/emails/email-template',
   
    // Data to be sent to PugJS template files. 
    data: { estimate: estimate} //req.body.estmate
  })
  .then( function(response){
    console.log('Message sent!');
    res.send({isSent:true});
  })
  .catch( function(err){
    console.log('Something went wrong!', err);
    res.send({isSent:false});
  });

  
});


module.exports = router;