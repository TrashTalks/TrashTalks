'use strict';

const validator = require('validator');
const config = require('../config');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: config.get('TRASHTALKS_GMAIL'),
         pass: config.get('GMAIL_PASSWORD')
     }
 });

 module.exports={
     signedUp: function (email, firstName) {
        const mailOptions = {
            from: config.get('TRASHTALKS_GMAIL'), // sender address
            to: email, // list of receivers
            subject: 'TrashTalks Virtual Business Cards', // Subject line
            html: '<p>Hello ' + firstName + ',</p><br><p>Thank you for your request. We appreciate your willingness to assist us in our efforts to reduce waste. Our virtual business cards are attached.</p><br><img src="cid:artuorSalmeron@cid"/><br><img src="cid:lukeChambers@cid"/><br><img src="cid:jacquelineAlexander@cid"/>',// plain text body
            attachments: [
              {
                path: 'https://i.imgur.com/sEcmgLS.jpg',
                cid: 'artuorSalmeron@cid'
              },
              {
                path: 'https://i.imgur.com/4WIxav4.jpg',
                cid: 'lukeChambers@cid'
              },
              {
                path: 'https://i.imgur.com/UVcPIHd.jpg',
                cid: 'jacquelineAlexander@cid'
              }
            ]
          };
          transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
     }
 }