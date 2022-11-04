const User = require("../models/user.model");
const Lead = require("../models/lead.model");

const mailingService = require("../utils/mailingService");


/**
 * This file will have the logic for all operations related to Lead
 */
exports.createLead = async (req, res) => {
    try {
        const availableTeleCallers = await User.aggregate([
            { $match: { company: req.companyId, userType: 'TELECALLER', userStatus: 'APPROVED' } },
            { $addFields: { leadsLength: { $size: "$assignedLeads" } } },
            { $sort: { leadsLength: -1 } }
        ]);
        console.log(availableTeleCallers);
        if (availableTeleCallers.length == 0) {
            return res.status(404).send({
                message: "Can't find Tele Callers to assign Leads, Please add Tele Callers first.",
                status: 404
            });
        }
        const leadObj = {
            name: req.body.name,
            email: req.body.email,
            mobileNo: req.body.mobileNo,
            leadSource: req.body.leadSource,
            leadType: req.body.leadType,
            leadFor: req.body.leadFor,
            comments: req.body.comments,
            company: req.companyId,
            createdBy: req.userId,
            assignedTo: availableTeleCallers[0]._id,
        };
        const savedLead = await Lead.create(leadObj);


        const userToBeUpdated = await User.findOne({ _id: availableTeleCallers[0]._id });
        userToBeUpdated.assignedLeads.push(savedLead._id);
        userToBeUpdated.save();

        // const sub = 'Welcome to Adosy CRM';
        // const body = `Congrats, Mr. ${savedCompany.ownerName}, your company has been successfully registered.\n
        // To access please go to our website and login using the following credentials:\n
        // email: ${savedUser.email} \n
        // password: ${password} \n
        // Please change your password as soon as you login. And feel free to contact us for any enquire. \n
        // `
        // mailingService.sendMail(sub, body, savedCompany.companyEmail);

        res.status(200).send({ savedLead, massage: "Lead created successfully", status: 200 });
    } catch (err) {
        // Sending The Error as a Response
        console.log("Error while creating Lead ", err.message);
        res.status(500).send({
            message: "Some internal server error",
            status: 500
        });
    }
}

exports.getLeads = async (req, res) => {
    try {
        // const allLeads = await Lead.find({company : req.companyId});
        const requestingUser = await User.findById(req.userId);
        const queryObj = {
            company: req.companyId
        };
        if(requestingUser.userType == 'TELECALLER'){
            queryObj['assignedTo'] = req.userId;
        }
        if(requestingUser.userType == 'MANAGER'){
            queryObj['assignedTo'] = req.userId;
        }
        const allLeads = await Lead.aggregate([
            { $match: { } },
            {
                $lookup: {
                    from: 'projects',
                    let: { searchId : "$leadFor" },
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
                    ], as: "projectDetails"
                }
                
            },
            {
                $unwind: '$projectDetails'
            },
            {
                $lookup: {
                    from: 'users',
                    let: { searchId : "$createdBy" },
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
            {
                $lookup: {
                    from: 'users',
                    let: { searchId : "$assignedTo" },
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
                    ], as: "assignedTo"
                }
            },
            {
                $unwind: '$assignedTo'
            }
        ])
        res.status(200).send({ allLeads, message: "Successfully fetched all Leads", status: 200 });
    } catch (err) {
        console.log("Error while fetching Companies ", err.message);
        res.status(500).send({
            message: "Some internal server error",
            status: 500
        });
    }
}