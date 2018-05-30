'use strict';

const Datastore = require('@google-cloud/datastore');
const config = require('../config');

// ------- General configuration for GCP DS 

  const ds = Datastore({
    projectId: config.get('GCLOUD_PROJECT')
  });

  const kind = 'SocialMediaInfo';

// End of Configuation

module.exports={
  // ------- Use 'read' to query the table/kind in ds
    read: function(req,res){
      ds.createQuery(kind).run(function(err,cb){
        if(err){
          console.log("Error in Founders.js: "+ err)
        }
        else(
          res.json(cb)
        )
      });
    }
  // -----------------------------------
};