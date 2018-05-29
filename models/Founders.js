'use strict';

const Datastore = require('@google-cloud/datastore');
const config = require('../config');

// [START config]
const ds = Datastore({
  projectId: config.get('GCLOUD_PROJECT')
});
const kind = 'SocialMediaInfo';
// [END config]

module.exports={

  read: function(req,res){
    ds.createQuery(kind).run(function(err,cb){
      if(err){
        console.log(err);
      }
      else(
        res.json(cb)
      )
    });
  }
};