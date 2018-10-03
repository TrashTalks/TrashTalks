"use strict";

const Datastore = require("@google-cloud/datastore");
const config = require("../config");
const validator = require("validator");
const axios = require("axios");

const ds = Datastore({
  projectId: config.get("GCLOUD_PROJECT")
});
const apiKey = config.get("WALMART_APIKEY");
const kind = "Waste";

module.exports = {
  update: function(req, res) {
    const upcCode = req.upc_code;
    const waste = req.material_name;
    if (waste) {
      var theQuery = ds.createQuery([kind]).filter("material_name", "=", waste);
    } else {
      var theQuery = ds.createQuery([kind]).filter("upc_code", "=", upcCode);
    }

    ds.runQuery(theQuery, function(err, cbRes) {
      //needs to be updated to allow the res.json to work
      if (err) {
        res.json(err);
      } else if (cbRes.length == 0) {
        ds.upsert({
          data: req,
          key: ds.key(kind)
        });
      }
    });
  },
  read: function(req, res) {
    const waste = validator
      .escape(req.body.material_name)
      .toLowerCase()
      .trim();
    const upcCode = validator
      .escape(req.body.upc_code)
      .toLowerCase()
      .trim();
    req.body.material_name = waste;
    req.body.upc_code = upcCode;
    if (waste) {
      const theQuery = ds
        .createQuery([kind])
        .filter("material_name", "=", waste);

      ds.runQuery(theQuery, function(err, cbRes) {
        if (err) {
          res.json(err);
        } else if (cbRes.length == 0) {
          // console.log("Material Not Found!");
          // res.json({ error: "Empty Submission" });
          const newMaterial = {
            components: [],
            material_name: waste,
            producing_company: "Not Found",
            product_description: "Not Found",
            submitted_by: "",
            timestamp: new Date(Date.now()),
            upc_code: "",
            wholly_recyclable: false,
            verified: false,
            img_url:
              "https://cdn3.iconfinder.com/data/icons/modifiers-add-on-1/48/v-17-512.png"
          };
          console.log(newMaterial);
          module.exports.update(newMaterial); //need to add the res parameter and get it back from the update function
          res.json(newMaterial);
        } else {
          cbRes[0].producing_company = cbRes[0].producing_company.toProperCase();
          cbRes[0].material_name = cbRes[0].material_name.toProperCase();
          console.log(cbRes);
          res.json(cbRes[0]);
        }
      });
    } else if (upcCode) {
      const theQuery = ds.createQuery([kind]).filter("upc_code", "=", upcCode);

      ds.runQuery(theQuery, function(err, cbRes) {
        if (err) {
          res.json(err);
        } else if (cbRes.length == 0) {
          axios
            .get(
              "https://api.walmartlabs.com/v1/items?apiKey=" +
                apiKey +
                "&upc=" +
                upcCode
            )
            .then(response => {
              const newMaterial = {
                components: [],
                material_name: response.data.items[0].name.toLowerCase(),
                producing_company: response.data.items[0].brandName.toLowerCase(),
                product_description:
                  response.data.items[0].shortDescription.toLowerCase() ===
                  undefined
                    ? response.data.items[0].shortDescription.toLowerCase()
                    : "",
                submitted_by: "",
                timestamp: new Date(Date.now()),
                upc_code: response.data.items[0].upc,
                wholly_recyclable: false,
                verified: false,
                img_url: response.data.items[0].mediumImage.toLowerCase()
              };
              console.log(newMaterial);
              module.exports.update(newMaterial); //need to add the res parameter and get it back from the update function
              res.json(newMaterial);
            })
            .catch(error => {
              // console.log(error);
              // console.log("Material Not Found!");
              // res.json({ error: "Empty Submission" });
              const newMaterial = {
                components: [],
                material_name: "Not Found",
                producing_company: "Not Found",
                product_description: "Not Found",
                submitted_by: "",
                timestamp: new Date(Date.now()),
                upc_code: upcCode,
                wholly_recyclable: false,
                verified: false,
                img_url:
                  "https://cdn3.iconfinder.com/data/icons/modifiers-add-on-1/48/v-17-512.png"
              };
              console.log(newMaterial);
              module.exports.update(newMaterial); //need to add the res parameter and get it back from the update function
              res.json(newMaterial);
            });
          // res.json(newMaterial);
        } else {
          cbRes[0].producing_company = cbRes[0].producing_company.toProperCase();
          cbRes[0].material_name = cbRes[0].material_name.toProperCase();
          console.log(cbRes);
          res.json(cbRes[0]);
        }
      });
    } else {
      res.json({ error: "Empty Submission" });
    }
  }
};

String.prototype.toProperCase = function() {
  return this.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
