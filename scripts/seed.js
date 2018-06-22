'use strict';

const Datastore = require('@google-cloud/datastore');
const config = require('../config');

const ds = Datastore({
  projectId: config.get('GCLOUD_PROJECT')
});

const wasteSeed = [{
    components: ["aluminum can"],
    material_name: "haddy belgion style white",
    producing_company: "reformation brewery",
    product_description: "beer can",
    submitted_by: "test@test.com",
    timestamp: new Date(Date.now()),
    upc_code: "855385007003",
    wholly_recyclable: true,
    verified: true,
    img_url: "https://res.cloudinary.com/ratebeer/image/upload/d_beer_img_default.png,f_auto/beer_357263"
},
{
    components: ["aluminum can"],
    material_name: "aluminum can",
    producing_company: "various",
    product_description: "aluminum can generally used for beverage distribution.",
    submitted_by: "test@test.com",
    timestamp: new Date(Date.now()),
    upc_code: "",
    wholly_recyclable: true,
    verified: true,
    img_url: "https://5.imimg.com/data5/UO/FB/MY-10726817/200-ml-aluminium-can-500x500.jpg"
}]

const componentSeed = [{
    component_name: "aluminum can",
    material_makeup: "aluminum",
    recyclable_description: "Aluminum cans are a valued recyclable resource which is generally recyclable in single-stream and source separated bins.",
    recycle_rating: 9,
    technically_recyclable: true
}]

addSeed(wasteSeed, "Waste")
addSeed(componentSeed, "Component")

function addSeed(seed, kind){
    seed.forEach(function(element) {
        ds.upsert ({
            data: element,
            key:ds.key(kind)
        }).catch(err => {console.error(err)})
    })
}