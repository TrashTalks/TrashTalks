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
    
  update: function(req, res) {
    const upcCode = req.upc_code
      const theQuery = ds.createQuery([kind])
        .filter('upc_code', '=', upcCode)

      ds.runQuery(theQuery,function(err,cbRes){//needs to be updated to allow the res.json to work
        if(err){
          res.json(err)
        } else if (cbRes.length == 0) {
          ds.upsert ({
            data:req,
            key:ds.key(kind)
          })
          // res.json([req])
        } else {
          res.json({error:"UPC not added"});
        } 
      });
  },
  read: function(req, res) {
    const waste = validator.escape(req.body.material_name).toLowerCase().trim()
    const upcCode = validator.escape(req.body.upc_code).toLowerCase().trim()
    req.body.material_name = waste
    req.body.upc_code = upcCode
    if (waste) {
      const theQuery = ds.createQuery([kind])
      .filter('material_name', '=', waste)

      ds.runQuery(theQuery, function(err,cbRes){
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
        const theQuery = ds.createQuery([kind])
        .filter('upc_code', '=', upcCode)
  
        ds.runQuery(theQuery, function(err,cbRes){
        if(err) {
            res.json(err)
        } else if (cbRes.length == 0) {
            axios.get('https://api.walmartlabs.com/v1/items?apiKey=' + apiKey + "&upc=" + upcCode)
            .then(response => {
              const newMaterial = {
                components: [],
                material_name: response.data.items[0].name.toLowerCase(),
                producing_company: response.data.items[0].brandName.toLowerCase(),
                product_description: (response.data.items[0].shortDescription.toLowerCase() === undefined) ? response.data.items[0].shortDescription.toLowerCase() : "",
                submitted_by: "",
                timestamp: new Date(Date.now()),
                upc_code: response.data.items[0].upc,
                wholly_recyclable: false,
                verified: false,
                img_url: response.data.items[0].mediumImage.toLowerCase()
              }
              module.exports.update(newMaterial) //need to add the res parameter and get it back from the update function
              res.json([newMaterial])
              // .then(response => {
              //   console.log(response)
              //   res.json(response)
              // })
              // .catch(error => {
              //   res.json(error);
              // }) 
              
            })
            .catch(error => {
              res.json(error);
            });
            // res.json(newMaterial);
        } else {
            cbRes[0].material_name = cbRes[0].material_name.toProperCase()
            console.log(cbRes)
            res.json(cbRes);
        } 
        });
    } else {
      res.json({error:"Empty Submission"})
    }
    
  }
}

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
