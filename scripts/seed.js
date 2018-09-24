"use strict";

const Datastore = require("@google-cloud/datastore");
const config = require("../config");
const fs = require("fs");
const kinds = ["Components", "Employee", "MailingList", "Updates", "Waste"];

const ds = Datastore({
  projectId: config.get("GCLOUD_PROJECT")
});

kinds.forEach(function(kind) {
  fs.readFile("../dbSeed/" + kind + ".json", "utf8", function readFileCallback(
    err,
    data
  ) {
    if (err) {
      console.log(err);
    } else {
      const obj = JSON.parse(data);
      addSeed(obj, kind);
    }
  });
});

function addSeed(seed, kind) {
  seed.forEach(function(element) {
    ds.upsert({
      data: element,
      key: ds.key(kind)
    }).catch(err => {
      console.error(err);
    });
    console.log(kind + " added");
  });
}
