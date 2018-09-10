"use strict";

const Datastore = require("@google-cloud/datastore");
const config = require("../config");
const fs = require("fs");
const kinds = ["Components", "Employee", "MailingList", "Updates", "Waste"];

const ds = Datastore({
  projectId: config.get("GCLOUD_PROJECT")
});

kinds.forEach(function(kind) {
  ds.createQuery(kind).run(function(err, cb) {
    if (err) {
      console.log(err);
    } else {
      fs.writeFile("../dbSeed/" + kind + ".json", JSON.stringify(cb), function(
        err
      ) {
        if (err) throw err;
        console.log(kind + " pulled");
      });
    }
  });
});
