"use strict";

const Datastore = require("@google-cloud/datastore");
const config = require("../config");

const ds = Datastore({
  projectId: config.get("GCLOUD_PROJECT")
});

const kind = "User";

module.exports = {
  // ------- Use 'read' to query the table/kind in ds
  read: function(req, res) {
    ds.createQuery(kind).run(function(err, cb) {
      if (err) {
        console.log(err);
      } else res.json(cb);
    });
  }
};
