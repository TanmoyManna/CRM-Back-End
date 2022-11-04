/**
 * This file will contain the schema of the Leads model
 */

const mongoose = require("mongoose");
const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    leadSource: {
        type: String,
        required: true,
        default: "None",
        enum : ['None', 'Face Book', 'Google Ad Works', '99 acres', 'Magic bricks', 'Houesing', 'Channel Partner']
    },
    leadType: {
        type: String,
        required: true,
        default: "None",
        enum : ['None', '1BHK', '2BHK', '3BHK', 'DUPLEX']
    },
    leadFor: {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Projects"
    },   
    leadStatus: {
        type: String,
        required: true,
        default: "Unattended",
        enum : ['Unattended', 'Follow Up', 'Site Visit', 'Deal Closed', 'Lead Lost', 'Lead Declined']
    }, 
    comments: {
        type: String,
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
    assignedTo: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
        required: true
    },
    followUps: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "FollowUps",
    },
    siteVisits:{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "SiteVisits",
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

module.exports = mongoose.model("Leads", leadSchema);