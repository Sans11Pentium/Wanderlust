const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
// const Listing=require("./models/listing.js");
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

const initDB=async () =>{
    //initially present data has to be deleted from db
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "665c0ec943a280b07ad1be52"}));
    await Listing.insertMany(initData.data);
    console.log("data was iniialised");
}

initDB();