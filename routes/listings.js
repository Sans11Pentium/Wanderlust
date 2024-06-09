const express = require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer')

const {storage} = require("../cloudConfig.js");

const upload = multer({ storage });

router.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn, upload.single('listing[image]'), validateListing,
    wrapAsync(listingController.createListing)
)
// .post(upload.single('listing[image]'),(req,res)=>{
//     res.send(req.file);
//     // OUTPUT : {"fieldname":"listing[image]","originalname":"assessment3.png","encoding":"7bit","mimetype":"image/png","destination":"uploads/","filename":"4e994779cda943bb8248ca0e06e5cf86","path":"uploads\\4e994779cda943bb8248ca0e06e5cf86","size":60377}
// })

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router;