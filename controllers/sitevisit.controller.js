const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const SiteVisit = require("../models/sitevisit.model");
const Lead = require("../models/lead.model");



/**
 * This file will have the logic for all operations related to Follow Ups
 */
exports.createSiteVisit = async (req, res) => {
    try {
        const siteVisitUpObj = {
            leadId: req.body.leadId,
            comments: req.body.comments,
            company: req.companyId,
            createdBy: req.userId
        };
        const savedSiteVisit = await SiteVisit.create(siteVisitUpObj);

        const leadToBeUpdated = await Lead.findOne({ _id : req.body.leadId });
        leadToBeUpdated.siteVisits.push(savedSiteVisit._id);
        await leadToBeUpdated.save();

        res.status(200).send({ savedSiteVisit, massage: "Site Visit created successfully", status: 200 });
    } catch (err) {
        // Sending The Error as a Response
        console.log("Error while creating Site Visit ", err.message);
        res.status(500).send({
            message: "Some internal server error",
            status: 500
        });
    }
}

exports.getSiteVisit = async (req, res) => {
    try {
        // const allSiteVisit = await SiteVisit.find({ company: req.companyId, leadId: req.query.leadId });
        const queryObj = {
            company: req.companyId
        };
        if(req.query.leadId){
            queryObj['leadId'] = ObjectId(req.query.leadId);
        }
        if(req.query.keyword){
            const keyword = req.query.keyword
            queryObj['$or'] = [{ name: RegExp(keyword, 'i') }, { email: RegExp(keyword, 'i') }, { mobileNo: RegExp(keyword, 'i') }, { leadSource: RegExp(keyword, 'i') }, { leadType: RegExp(keyword, 'i') }]
        }
        let dateObj = {
        }
        if(req.query.startDate){
            dateObj['$gte'] = new Date(req.query.startDate)
        }
        if(req.query.endDate){
            dateObj['$lt'] = new Date(req.query.endDate)
        }
        if(dateObj.$gte || dateObj.$lt ){
            queryObj['createdAt'] = dateObj;
        }
        console.log(queryObj);
        const allSiteVisit = await SiteVisit.aggregate([
            // { $match: { company: req.companyId, leadId: ObjectId(req.query.leadId) } },
            {
                $match: queryObj
            },
            { $sort: { createdAt : 1 } },
            {
                $lookup: {
                    from: 'leads',
                    let: { searchId : "$leadId" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $and:
                                        [
                                            { $eq: ["$_id", "$$searchId"] }
                                        ]
                                }
                            }
                        }
                    ], as: "leadDetails"
                }
            },
            {
                $unwind: '$leadDetails'
            },
            {
                $lookup: {
                    from: 'users',
                    let: { searchId: "$createdBy" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $and:
                                        [
                                            { $eq: ["$_id", "$$searchId"] }
                                        ]
                                }
                            }
                        }
                    ], as: "createdBy"
                }
            },
            {
                $unwind: '$createdBy'
            },
        ])
        res.status(200).send({ allSiteVisit, message: "Successfully fetched all Site Visit", status: 200 });
    } catch (err) {
        console.log("Error while fetching Site Visits ", err.message);
        res.status(500).send({
            message: "Some internal server error",
            status: 500
        });
    }
}