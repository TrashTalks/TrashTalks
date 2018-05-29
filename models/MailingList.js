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
      .filter('Subscriber_Email', '=', req.body.Subscriber_Email.toLowerCase())

    ds.runQuery(theQuery,function(err,cbRes){
      if(err){
        console.log(err)
      } else if (cbRes.length == 0) {
        req.body.Subscriber_Email = req.body.Subscriber_Email.toLowerCase()
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
      .filter('Subscriber_Email', '=', req.params.id)

    ds.runQuery(theQuery,function(err,cbRes){
      if(err){
      console.log(err)
      }
      console.log(cbRes)
      res.json(cbRes);
    });
  },
  delete: function(req,res){
    // var theKey = ds.key([kind, parseInt(req.params.id, 10)]);
    const theQuery = ds.createQuery([kind])
      .filter('Subscriber_Email', '=',req.params.id)

    ds.runQuery(theQuery,function(err,cbRes){
      if(err){
      console.log("err at MailingList.js line 219")
      }

      res.json(cbRes);
    });
  }
};