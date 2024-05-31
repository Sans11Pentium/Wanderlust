const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    }
    // username and password will automatically be added by passport local mongoose
});

User.plugin(passportLocalMongoose); //this implements addn of username,pswd,salting,hashing

module.exports = mongoose.model('User',userSchema);