'use strict';
const router = require("express").Router();  
const getModel = require(`../../models/MailingList.js`);



// // Automatically parse request body as form data
// router.use(bodyParser.urlencoded({ extended: false }));

// // Set Content-Type for all responses for these routes
// router.use((req, res, next) => {
// res.set('Content-Type', 'text/html');
// next();
// });

// router.get('/mailingList/:id', (req, res, next) => {
//     getModel().read(req.params.id, (err, entity) => {
//       if (err) {
//         next(err);
//         return;
//       }
//       res.json(entity);
//     });
//   });
router.route("/:id").get(getModel.read);

// router.post('/mailingList', (req, res, next) => {
// const data = req.body;
//  // Save the data to the database.
//     getModel().create(data, (err, savedData) => {
//         if (err) {
//         next(err);
//         return;
//         }
//         res.redirect(`/`);
//     });
// });
router.route("/").post(getModel.update);
router.route("/delete/:id").post(getModel.delete);
module.exports=router;