const User = require("../models/user.model");
const Company = require("../models/company.model");
const Project = require("../models/projects.model");

// const fileDelete = require("../utils/deletefiles");
/**
 * This file will have the logic for all operations related to company
 */
exports.createProjects = async (req, res) => {
    try {
        const projectObj = {
            propertyName: req.body.propertyName,
            propertyAddress: req.body.propertyAddress,
            developerName: req.body.developerName,
            image: req.file.path,
            company: req.companyId,
        };
        const savedProject = await Project.create(projectObj);

        const companyToBeUpdated = await Company.findOne({_id : req.companyId});
        companyToBeUpdated.projects.push(savedProject._id);
        await companyToBeUpdated.save();

        res.status(200).send({ savedProject, massage: "Project created successfully", status: 200 });
    } catch (err) {
        // Sending The Error as a Response
        console.log("Error while creating Project ", err.message);
        res.status(500).send({
            message: "Some internal server error",
            status: 500
        });
    }
}

exports.getProjects = async (req, res) => {
    try {
        const allProjects = await Project.find({company : req.companyId});
        res.status(200).send({ allProjects, message: "Successfully fetched all Projects", status: 200 });
    } catch (err) {
        console.log("Error while fetching Companies ", err.message);
        res.status(500).send({
            message: "Some internal server error",
            status: 500
        });
    }
}