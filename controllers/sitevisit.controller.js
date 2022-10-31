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
        const allSiteVisit = await SiteVisit.find({ company: req.companyId, leadId: req.query.leadId });

        // const allFollowUps = await FollowUp.aggregate([
        //     { $match: { company: req.companyId, leadId: req.query.leadId } },
        //     { $lookup: { from: 'Leads' }, let: { searchId : { $toObjectId: "$leadId" } },
        //         pipeline: [
        //             {$match: {$expr:[ {"_id": "$$searchId"}]}}                   
        //         ], as: "leadDetails"
        //     }
        // ])

        // const allFollowUps = await FollowUp.aggregate([
        //     {
        //         $lookup:
        //         {
        //             from: 'Leads',
        //             localField: "leadId",
        //             foreignField: "_id",
        //             as: "leadDetails"
        //         }
        //     }
        // ])
        res.status(200).send({ allSiteVisit, message: "Successfully fetched all Site Visit", status: 200 });
    } catch (err) {
        console.log("Error while fetching Site Visits ", err.message);
        res.status(500).send({
            message: "Some internal server error",
            status: 500
        });
    }
}