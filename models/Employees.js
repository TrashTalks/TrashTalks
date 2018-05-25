'use strict';

const Datastore = require('@google-cloud/datastore');
const config = require('../config');

// [START config]
const ds = Datastore({
  projectId: config.get('GCLOUD_PROJECT')
});
const kind = 'Employee';
// // [END config]
module.exports={
  // Translates from Datastore's entity format to
  // the format expected by the application.
  //
  // Datastore format:
  //   {
  //     key: [kind, id],
  //     data: {
  //       property: value
  //     }
  //   }
  //
  // Application format:
  //   {
  //     id: id,
  //     property: value
  //   }
  // function fromDatastore (obj) {
  //   obj.id = obj[Datastore.KEY].id;
  //   return obj;
  // }

  // Translates from the application's format to the datastore's
  // extended entity property format. It also handles marking any
  // specified properties as non-indexed. Does not translate the key.
  //
  // Application format:
  //   {
  //     id: id,
  //     property: value,
  //     unindexedProperty: value
  //   }
  //
  // Datastore extended format:
  //   [
  //     {
  //       name: property,
  //       value: value
  //     },
  //     {
  //       name: unindexedProperty,
  //       value: value,
  //       excludeFromIndexes: true
  //     }
  //   ]
  // function toDatastore (obj, nonIndexed) {
  //   nonIndexed = nonIndexed || [];
  //   const results = [];
  //   Object.keys(obj).forEach((k) => {
  //     if (obj[k] === undefined) {
  //       return;
  //     }
  //     results.push({
  //       name: k,
  //       value: obj[k],
  //       excludeFromIndexes: nonIndexed.indexOf(k) !== -1
  //     });
  //   });
  //   return results;
  // }

  // Lists all employees in the Datastore sorted alphabetically by title.
  // The ``limit`` argument determines the maximum amount of results to
  // return per page. The ``token`` argument allows requesting additional
  // pages. The callback is invoked with ``(err, employees, nextPageToken)``.
  // [START list]
  // function list (limit, token, cb) {
  //   const q = ds.createQuery([kind])
  //     .limit(limit)
  //     .order('title')
  //     .start(token);

  //   ds.runQuery(q, (err, entities, nextQuery) => {
  //     if (err) {
  //       cb(err);
  //       return;
  //     }
  //     const hasMore = nextQuery.moreResults !== Datastore.NO_MORE_RESULTS ? nextQuery.endCursor : false;
  //     cb(null, entities.map(fromDatastore), hasMore);
  //   });
  // }
  list:function(req,res){
    const theQuery = ds.createQuery([kind])
      .limit(req.limit)
      .order('title')
      .start(req.token);

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
  // [END list]

  // Creates a new employee or updates an existing employee with new data. The provided
  // data is automatically translated into Datastore format. The employee will be
  // queued for background processing.
  // [START update]
  // function update (id, data, cb) {
  //   let key;
  //   if (id) {
  //     key = ds.key([kind, parseInt(id, 10)]);
  //   } else {
  //     key = ds.key(kind);
  //   }

  //   const entity = {
  //     key: key,
  //     data: toDatastore(data, ['description'])
  //   };

  //   ds.upsert (
  //     entity,
  //     (err) => {
  //       data.id = entity.key.id;
  //       cb(err, err ? null : data);
  //     }
  //   );
  // }
  update: function(req,res){
    let key;
    if (req.body.id) {
      key = ds.key([kind, parseInt(id, 10)]);
    } else {
      key = ds.key(kind);
    }

    const entity = {
      key: key,
      data: toDatastore(req.body, ['description'])
    };

    ds.upsert (
      {data:req.body,
      key:key}
    );

    function toDatastore (obj, nonIndexed) {
      nonIndexed = nonIndexed || [];
      const results = [];
      Object.keys(obj).forEach((k) => {
        if (obj[k] === undefined) {
          return;
        }
        results.push({
          name: k,
          value: obj[k],
          excludeFromIndexes: nonIndexed.indexOf(k) !== -1
        });
      });
      return results;
    }
  },
  // [END update]

  // function create (data, cb) {
  //   update(null, data, cb);
  // }

  read: function(req,res){
    console.log("read"+req.params.id);
    var id=req.params.id;
    // // res.json(fromDatastore(ds.get(req.params.id)));
    const key = ds.key([kind, parseInt(id, 10)]);
    res.json(ds.get(key));
    function fromDataStore (obj) {
        obj.id = obj[Datastore.KEY].id;
        return obj;
    }

    console.log("key:"+JSON.stringify(key)); 
    console.log("ds.get:"+JSON.stringify(ds.get(key)));
    // res.json(ds.get(key));

    // ds.get(key, (err, entity) => {
    //   if (!err && !entity) {
    //     err = {
    //       code: 404,
    //       message: 'Not found'
    //     };
    //   }
    //   if (err) {
    //     cb(err);
    //     return;
    //   }
    //   cb(null, fromDatastore(entity));
    // });
  },

  delete: function(req,res){
    
      // const key = ds.key([kind, parseInt(id, 10)]);
    ds.delete(ds.key([kind, parseInt(req.params.id, 10)]));
  }
};//end of module.exports