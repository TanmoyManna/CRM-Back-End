const FollowUp = require("../models/followup.model");
const Lead = require("../models/lead.model");



/**
 * This file will have the logic for all operations related to Follow Ups
 */
exports.createFollowUp = async (req, res) => {
    try {
        const followUpObj = {
            leadId: req.body.leadId,
            comments: req.body.comments,
            company: req.companyId,
            createdBy: req.userId
        };
        const savedFollowUp = await FollowUp.create(followUpObj);

        const leadToBeUpdated = await Lead.findOne({ _id: req.body.leadId });
        leadToBeUpdated.followUps.push(savedFollowUp._id);
        await leadToBeUpdated.save();
        res.status(200).send({ savedFollowUp, massage: "Follow Up created successfully", status: 200 });
    } catch (err) {
        // Sending The Error as a Response
        console.log("Error while creating Follow Ups ", err.message);
        res.status(500).send({
            message: "Some internal server error",
            status: 500
        });
    }
}

exports.getFollowUp = async (req, res) => {
    try {
        // const allFollowUps = await FollowUp.find({ company: req.companyId, leadId: req.query.leadId });

        const allFollowUps = await FollowUp.aggregate([
            // { $match: { company: req.companyId, leadId: req.query.leadId } },
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
            }
        ])

        // {$expr:[ { $and: { "_id": "$$searchId" } } ]}
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
        res.status(200).send({ allFollowUps, message: "Successfully fetched all Follow Ups", status: 200 });
    } catch (err) {
        console.log("Error while fetching Follow Ups ", err.message);
        res.status(500).send({
            message: "Some internal server error",
            status: 500
        });
    }
}