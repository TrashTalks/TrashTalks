'use strict';

const validator = require('validator');
const config = require('../config');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport(
  {
  service: 'gmail',
  auth: {
         user: config.get('TRASHTALKS_GMAIL'),
         pass: config.get('GMAIL_PASSWORD')
     }
 });

 module.exports={
     signedUp: function (email, firstName) {
        const mailOptions = {
            from: config.get('TRASHTALKS_ALIAS'), // sender address
            to: email, // list of receivers
            subject: 'TrashTalks Virtual Business Cards', // Subject line
            html: '<p>Hello ' + firstName + ',</p><br><p>Thank you for your request. We appreciate your willingness to assist us in our efforts to reduce waste. Our virtual business cards are attached.</p><br><img src="cid:artuorSalmeron@cid"/><br><img src="cid:lukeChambers@cid"/><br><img src="cid:jacquelineAlexander@cid"/>',// plain text body
            attachments: [
              {
                filename: 'LukeCard.jpg',
                path: __dirname + '/../client/public/LukeCard.jpg'
              },
              {
                filename: 'JackieCard.jpg',
                path: __dirname + '/../client/public/JackieCard.jpg'
              },
              {
                filename: 'ArturoCard.jpg',
                path: __dirname + '/../client/public/ArturoCard.jpg'
              }
            ]
          };
          transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
     },
     contactUs:function(req,res){
       //add all relevent code below
       const email = validator.escape(req.body.ContactEmail).toLowerCase().trim()
       const name = validator.escape(req.body.ContactName.trim())
       const org = validator.escape(req.body.ContactOrg.trim())
       const message = validator.escape(req.body.ContactMessage.trim())
       const phone = validator.escape(req.body.ContactPhone.trim())
       if (!validator.isEmail(email)) {
         console.log("Incorrect Email Format.")
          res.json({error: "Incorrect Email Format."});
        } else if (!validator.isMobilePhone(phone, "any") && phone!="") {
          console.log("Incorrect Phone Format.")
          res.json({error: "Incorrect Phone Format."});
        } else if (!message) {
          console.log("Incorrect Message Format.")
          res.json({error: "Message Can Not Be Empty."});
        } else {
          const mailOptions = {
            from: config.get('TRASHTALKS_ALIAS'), // sender address
            to: ['luke@trashtalks.info', 'arturo@trashtalks.info, jackie@trashtalks.info'], // list of receivers
            subject: 'Contact Us Form', // Subject line
            html: '<p>Name: ' + name + '</p><br>' +
                  '<p>Email: ' + email + '</p><br>' +
                  '<p>Organization: ' + org + '</p><br>' +
                  '<p>Phone: ' + phone + '</p><br>' +
                  '<p>Message: ' + message + '</p><br>'
          };
          transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
        });
        res.json({
          Yes: "Message Accepted",
          Req: req.body
        })
      }
     }
     
 }