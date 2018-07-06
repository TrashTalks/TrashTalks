'use strict';

const Datastore = require('@google-cloud/datastore');
const config = require('../config');
const validator = require('validator');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: config.get('TRASHTALKS_GMAIL'),
         pass: config.get('GMAIL_PASSWORD')
     }
 });

const ds = Datastore({
  projectId: config.get('GCLOUD_PROJECT')
});
const kind = 'MailingList';

module.exports={

  list:function(req,res){
    const theQuery = ds.createQuery([kind])
      .limit(req.params.limit)
      .order('title')
      start(req.params.token);

    ds.runQuery(theQuery,(err,entities,nextQuery)=> {
      if (err){
        res.json(err)
      }
      const hasMore = nextQuery.moreResults !== Datastore.NO_MORE_RESULTS ? nextQuery.endCursor : false;
      //idk if the res.json will work here
      res.json(null, entities.map(fromDatastore),hasMore);

      function fromDatastore (obj) {
        obj.id = obj[Datastore.KEY].id;
        return obj;
      }
    })
  },
  update: function(req,res){
    const email = validator.escape(req.body.Subscriber_Email).toLowerCase().trim()
    const firstName = validator.escape(req.body.First_Name.trim())
    const lastName = validator.escape(req.body.Last_Name.trim())
    let mailingListData = {
      First_Name: firstName,
      Last_Name: lastName,
      Subscriber_Email: email,
      mailing_list: req.body.MailList,
      timestamp: new Date(Date.now())
    }
    if (!validator.isEmail(email)) {
      res.json({error: "Email Not Saved! Email Incorrect."});
    } else {
      const theQuery = ds.createQuery([kind])
        .filter('Subscriber_Email', '=', email)

      ds.runQuery(theQuery,function(err,cbRes){
        if(err){
          res.json(err)
        } else if (cbRes.length == 0) {
          ds.upsert ({
            data:mailingListData,
            key:ds.key(kind)
          })
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
          res.json({added: "Email Added Succefully!"});
        } else if (cbRes.length > 0) {
          res.json({error: "Email Already on list!"});
        } else {
          res.json({error: "Email Not Saved! Unknown Error!"});
        } 
      });
    }
  },
  read: function(req,res){
    const theQuery = ds.createQuery([kind])
      .filter('Subscriber_Email', '=', req.params.id)

    ds.runQuery(theQuery,function(err,cbRes){
      if(err){
        res.json(err)
      }
        res.json(cbRes);
    });
  },
  delete: function(req,res){
    // var theKey = ds.key([kind, parseInt(req.params.id, 10)]);
    const theQuery = ds.createQuery([kind])
      .filter('Subscriber_Email', '=',req.params.id)

    if(err){
      res.json(err)
    } else if (cbRes.length == 1) {
      var theKey = ds.key([kind, parseInt(cbRes[0][ds.KEY].id, 10)])
      ds.delete(theKey, function(err, cb) {
        if (err) {
          res.json(err)
        }
        res.json({removed: "Email has been removed from the list."});
      });
      
    } else if (cbRes.length < 1) {
      res.json({error: "Email not found on the list!"});
    } else if (cbRes.length > 1) {
      res.json({error: "More than one email on the list! Please contact support"});
    } else {
      res.json({error: "Unknown Error! Please contact support"});
    }
  }
}
