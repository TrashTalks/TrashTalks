'use strict';

const Datastore = require('@google-cloud/datastore');
const config = require('../config');

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
    const theQuery = ds.createQuery([kind])
      .filter('PersonEmail', '=', req.body.PersonEmail.toLowerCase())

    ds.runQuery(theQuery,function(err,cbRes){
      if(err){
        res.json(err)
      } else if (cbRes.length == 0) {
        req.body.PersonEmail = req.body.PersonEmail.toLowerCase()
        ds.upsert ({
          data:req.body,
          key:ds.key(kind)
        })
        res.json("Email Added Succefully!");
      } else {
        res.json("Email Already on list!");
      }
    });
  },
  read: function(req,res){
    const theQuery = ds.createQuery([kind])
      .filter('PersonEmail', '=', req.params.id)

    ds.runQuery(theQuery,function(err,cbRes){
      if(err){
        res.json(err)
      }
        res.json(cbRes);
    });
  },
  delete: function(req,res){
     const theQuery = ds.createQuery([kind])
      .filter('PersonEmail', '=', req.params.id.toLowerCase())

      ds.runQuery(theQuery,function(err,cbRes){

      if(err){
        res.json(err)
      } else if (cbRes.length == 1) {
        var theKey = ds.key([kind, parseInt(cbRes[0][ds.KEY].id, 10)])
        ds.delete(theKey, function(err, cb) {
          if (err) {
            res.json(err)
          }
          res.json("Email has been removed from the list.");
        });
        
      } else if (cbRes.length < 1) {
        res.json("Email not found on the list!");
      } else if (cbRes.length > 1) {
        res.json("More than one email on the list! Please contact support");
      } else {
        res.json("Unknown Error! Please contact support");
      }
    });
  }
};