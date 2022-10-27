const nodemailer = require("nodemailer");
exports.sendMail = (subject, body, receiver) => {

    const emailTransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: "wordsmithrealty2022@gmail.com",
            pass: 'hsqxkoxnidxbllek'
        },
        secure: true
    });
    const mailObj = {
        to: receiver,
        subject: subject,
        text: body
    }
    emailTransporter.sendMail(mailObj, async (err, info) => {
        if (err) {
            console.log("Error in sending email ", err.message);
        } else {
            console.log("Email was sent successfully");
        }
    });
};