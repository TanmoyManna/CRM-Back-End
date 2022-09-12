/**
 * This file will contain the schema of the company model
 */

const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        required: true,
        lowercase: true
    },
    companyAdmin: {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "User"
    },
    totalUsers: {
        type: Number,
        unique: true,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "ACTIVE",
        enum: ['ACTIVE', 'INACTIVE']
    },
    teams : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Team"
    },
    employees : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "User"
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

module.exports = mongoose.model("Company", userSchema);