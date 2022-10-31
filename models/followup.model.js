/**
 * This file will contain the schema of the Follow Up model
 */

const mongoose = require("mongoose");
const followUpSchema = new mongoose.Schema({
    leadId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Leads"
    },
    comments: {
        type: String,
        required: true,
    },
    company: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Companies"
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
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

module.exports = mongoose.model("FollowUps", followUpSchema);