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
        unique: true,
        required: true,
        lowercase: true
    },
    companyAdmin: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    totalUsers: {
        type: Number,
        required: true
    },
    currentUsers: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        required: true,
        default: "ACTIVE",
        enum: ['ACTIVE', 'INACTIVE']
    },
    projects: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Project"
    },
    employees: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User"
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