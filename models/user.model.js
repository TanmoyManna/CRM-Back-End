/**
 * This file will contain the schema of the user model
 */

const mongoose = require("mongoose");
const userSchema  = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    },
    userType : {
        type : String,
        required : true,
        default : "TELECALLER",
        enum : ['ADMIN', 'COMPANY_ADMIN', 'MANAGER', 'TELECALLER']
    },
    userStatus : {
        type : String, 
        required : true,
        default : "APPROVED",
        enum : ['APPROVED', 'PENDING', 'REJECTED']
    },
    image:{
        type: String,
    },
    company: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Companies"
    },
    createdAt : {
        type : Date,
        default : () =>{
            return Date.now();
        },
        immutable : true
    },
    updatedAt : {
        type : Date,
        default : () =>{
            return Date.now();
        }        
    },
});

module.exports = mongoose.model("Users", userSchema);