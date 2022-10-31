/**
 * This file will contain the schema of the company model
 */

const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    ownerName: {
        type: String,
        required: true
    },
    companyAdmin: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
        required: true
    },
    totalUsers: {
        type: Number,
        required: true
    },
    currentUsers: {
        type: Number,
        default: 0,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "ACTIVE",
        enum: ['ACTIVE', 'INACTIVE']
    },
    projects : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Projects"
    },
    employees: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Users"
    },
    image:{
        type: String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: () => {
            return Date.now();
        },
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    },
});

module.exports = mongoose.model("Companies", companySchema);