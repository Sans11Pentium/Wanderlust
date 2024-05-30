const express=require("express");
const app=express();
const mongoose=require("mongoose");
// const Listing=require("./models/listing.js");
// const Review=require("./models/review.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
// const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
// const {listingSchema, reviewSchema} = require("./schema.js");
const { wrap } = require("module");
// const review = require("./models/review.js");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const listings = require("./routes/listings.js");
const reviews = require("./routes/review.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main()
.then(()=>{
    console.log("connected to db");
})
.catch(err=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}

// const validateListing = (req,res,next)=>{
//     let {error} = listingSchema.validate(req.body);
//     if(error){
//         let errMsg = error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400,errMsg);
//     }else{
//         next();
//     }
// }

// const validateReview = (req,res,next)=>{
//     let {error} = reviewSchema.validate(req.body);
//     if(error){
//         let errMsg = error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400,errMsg);
//     }else{
//         next();
//     }
// }


//all listing rrelated routes are now in listing.js, no need to write here 
app.use("/listings", listings);
//all review related routes are now in reviews.js, no need to write here
app.use("/listings/:id/reviews",reviews);


// //delete route
// app.delete("/listings/:id",wrapAsync(async (req,res)=>{
//     let {id}=req.params;
//     let deletedListing=await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//     res.redirect("/listings");
// }));

// //new route
// app.get("/listings/new",(req,res)=>{
//     //render a form to collect data
//     res.render("listings/new.ejs");
// })

// //create route
// app.post("/listings",validateListing,wrapAsync(async (req,res,next)=>{
//     // let {title,description,image,price,country,location}=req.body;
//     let listing=req.body.listing; //all form data in form of js obj
//     //instead of checking individually for every field, use JOI
//     // if(!req.body.listing){
//     //     throw new ExpressError(400,"Send valid data for listing");
//     // }

//     // let result = listingSchema.validate(req.body);
//     // if(result.error){
//     //     throw new ExpressError(400,result.error);
//     // }
//     // console.log(result);

//     const newListing=new Listing(listing);
//     await newListing.save();
//     res.redirect("/listings");
//     console.log(listing);
// }));

// //edit route
// app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
//     let {id} = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/edit.ejs",{listing});
// }));

// //update route
// app.put("/listings/:id",validateListing,wrapAsync(async (req,res)=>{
//     // if(!req.body.listing){
//     //     throw new ExpressError(400,"Send valid data for listing");
//     // }
//     let {id}=req.params;
//     await Listing.findByIdAndUpdate(id,{...req.body.listing});
//     res.redirect(`/listings/${id}`);
// }));

// //index route
// app.get("/listings",wrapAsync(async (req,res)=>{
//     const allListings=await Listing.find({});
//     // .then(res=>{
//     //     console.log(res);
//     // }).catch(err=>{
//     //     console.log(err);
//     // })
//     res.render("listings/index.ejs",{allListings});
// }));

// //show route
// app.get("/listings/:id",wrapAsync(async (req,res)=>{
//     let {id} = req.params;
//     const listing = await Listing.findById(id).populate("reviews");
//     res.render("listings/show.ejs",{listing});
// }));

// //Reviews
// //POST route
// app.post("/listings/:id/reviews", validateReview,wrapAsync(async(req,res)=>{
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);

//     listing.reviews.push(newReview);

//     await newReview.save();
//     await listing.save();

//     res.redirect(`/listings/${listing._id}`);
// }));

// //DELETE review route
// app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async (req,res)=>{
//     let {id,reviewId} = req.params;
//     await Listing.findByIdAndUpdate(id, {$pull: {reviews:reviewId}});
//     await Review.findByIdAndDelete(reviewId);
//     res.redirect(`/listings/${id}`);
// }));

app.get("/",(req,res)=>{
    console.log("root working");
});

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;
    res.status(statusCode).render("error.ejs",{message});
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});