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
        default: "NONE",
        enum : ['None', 'Employee_Referral', 'Friends', 'Social_Media', 'Advertisement', 'Cold_Call']
    },
    leadType: {
        type: String,
        required: true,
        default: "NONE",
        enum : ['NONE', '1BHK', '2BHK', '3BHK', 'DUPLEX']
    },
    leadFor: {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Projects"
    },   
    leadStatus: {
        type: String,
        required: true,
        default: "UNATTENDED",
        enum : ['UNATTENDED', 'FOLLOW_UP', 'SITE_VISIT', 'DEAL_CLOSED', 'LEAD_LOST', 'LEAD_DECLINED']
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