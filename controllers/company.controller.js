const Company = require("../models/company.model");
const User = require("../models/user.model");

const fileDelete = require("../utils/deletefiles");
const passwordGenerator = require("../utils/passwordGenerator");
const mailingService = require("../utils/mailingService");

const bcrypt = require("bcryptjs");
/**
 * This file will have the logic for all operations related to company
 */
exports.createComany = async (req, res) => {
    try {
        const password = passwordGenerator.generatePasword();
        console.log(password);
        const userObj = {
            name: req.body.ownerName,
            email: req.body.companyEmail,
            password: bcrypt.hashSync(password, 8),
            userType: 'COMPANY_ADMIN',
        };
        const savedUser = await User.create(userObj);


        const companyObj = {
            companyName: req.body.companyName,
            companyEmail: req.body.companyEmail,
            ownerName: req.body.ownerName,
            companyAdmin: savedUser._id,
            totalUsers: req.body.totalUsers,            
            image: req.file.path
        };

        const savedCompany = await Company.create(companyObj);

        savedUser.company = savedCompany._id;
        await savedUser.save();
        

        // const sub = 'Welcome to banyantreegroup CRM';
        // const body = `Congrats, Mr. ${savedCompany.ownerName}, your company has been successfully registered.\n
        // To access please go to our website and login using the following credentials:\n
        // email: ${savedUser.email} \n
        // password: ${password} \n
        // Please change your password as soon as you login. And feel free to contact us for any enquire. \n
        // `
        // mailingService.sendMail(sub, body, savedCompany.companyEmail);

        const sub = 'Welcome to banyantreegroup CRM';
        const body = `Welcome Mr. ${savedCompany.ownerName},\n
        To access please go to our website and login using the following credentials:\n
        email: ${savedUser.email} \n
        password: ${password} \n
        `
        mailingService.sendMail(sub, body, savedUser.email);

        res.status(200).send({ savedCompany, massage: "Company created successfully", status: 200 });
    } catch (err) {
        // Sending The Error as a Response
        console.log("Error while creating Company ", err.message);
        res.status(500).send({
            message: "Some internal server error",
            status: 500
        });
    }
}

exports.getComanies = async (req, res) => {
    try {
        const allCompanies = await Company.find({});
        res.status(200).send({ allCompanies, message: "Successfully fetched all Companies", status: 200 });
    } catch (err) {
        console.log("Error while fetching Companies ", err.message);
        res.status(500).send({
            message: "Some internal server error",
            status: 500
        });
    }
}