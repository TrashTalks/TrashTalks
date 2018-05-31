'use strict';

const Datastore = require('@google-cloud/datastore');
const config = require('../config');
const validator = require('validator')

const ds = Datastore({
  projectId: config.get('GCLOUD_PROJECT')
});
const kind = 'Waste';

module.exports={
    
  read: function(req, res) {

    const waste = validator.escape(req.body.material_name).toLowerCase().trim()
    req.body.material_name = waste
console.log(waste)
    const theQuery = ds.createQuery([kind])
    .filter('material_name', '=', waste)

    ds.runQuery(theQuery,function(err,cbRes){
    if(err){
        res.json(err)
    } else if (cbRes.length == 0) {
        console.log("Material Not Found!")
        res.json("Material Not Found!");
    } else {
        console.log(cbRes)
        res.json(cbRes);
    } 
    });
  }
}
