/**
 * This file will contain the schema of the user model
 */

const mongoose = require("mongoose");
const userSchema  = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userId : {
        type : String, 
        unique : true,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        minLength : 10,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    },
    userType : {
        type : String,
        required : true,
        default : "CUSTOMER",
        enum : ['CUSTOMER', 'ENGINEER', 'ADMIN']
    },
    userStatus : {
        type : String, 
        required : true,
        default : "APPROVED",
        enum : ['APPROVED', 'PENDING', 'REJECTED']
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
    ticketsCreated : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Ticket"
    },
    ticketAssigned : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Ticket"
    }
});

module.exports = mongoose.model("User", userSchema);