/**
 * This file will contain the schema of the company model
 */

const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    propertyName: {
        type: String,
        required: true
    },
    propertyAddress: {
        type: String,
        required: true,
    },
    developerName: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required:true,
    },
    responsibleManager: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    },
    company: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Companies",
        required: true
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

module.exports = mongoose.model("Projects", userSchema);