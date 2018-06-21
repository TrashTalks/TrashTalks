'use strict';

const Datastore = require('@google-cloud/datastore');
const config = require('../config');
const validator = require('validator');
const axios = require('axios');

const ds = Datastore({
  projectId: config.get('GCLOUD_PROJECT')
});
const apiKey = config.get('WALMART_APIKEY');
const kind = 'Waste';

module.exports = {
    
  read: function(req, res) {

    const waste = validator.escape(req.body.material_name).toLowerCase().trim()
    const upcCode = validator.escape(req.body.upc_code).toLowerCase().trim()
    req.body.material_name = waste
    req.body.upc_code = upcCode
    if (waste) {
      const theQuery = ds.createQuery([kind])
      .filter('material_name', '=', waste)

      ds.runQuery(theQuery,function(err,cbRes){
      if(err){
          res.json(err)
      } else if (cbRes.length == 0) {
          console.log("Material Not Found!")
          res.json("Material Not Found!");
      } else {
          cbRes[0].material_name = cbRes[0].material_name.toProperCase()
          console.log(cbRes)
          res.json(cbRes);
      } 
      });
    } else if (upcCode) {
      axios.get('https://api.walmartlabs.com/v1/items?apiKey=' + apiKey + "&upc=" + upcCode)
      .then(response => {
        console.log(response.data);
        // res.json(response);
      })
      .catch(error => {
        console.log(error);
      });
    }
    
  }
}

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
