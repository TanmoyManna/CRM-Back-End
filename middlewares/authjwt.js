const jwt = require("jsonwebtoken");
const authconfig = require("../configs/auth.config");
const User = require("../models/user.model");
// Middleware to validate the access token

const verifytoken = (req, res, next) => {
  // if the token is present
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({
      message: "Token is missing",
    });
  }

  // if the token is valid
  jwt.verify(token, authconfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Invalid Token",
      });
    }
    // Fatch the userId from the token and set it to the request object
    req['userId'] = decoded.id;
    next();
  });
};

// Middleware to check if user is admin or not
const isAdmin = async (req, res, next) => {
  try {
    const userObj = await User.findOne({ _id: req.userId });
    if (userObj && userObj.userType == 'ADMIN') {      
      next();
    } else {
      return res.status(403).send({
        message: "Only ADMIN is Allowed",
      });
    }
  } catch {
    console.log("Error while checking if isAdmin", err.message);
    res.status(500).send({
      message: "Some internal server error",
    });
  }
};

// Middleware to check if user is a company Admin
const isCompanyAdmin = async (req, res, next) => {
  try {
    const userObj = await User.findOne({ _id: req.userId });
    if (userObj && userObj.userType == 'COMPANY_ADMIN') {
      req['companyId'] = userObj.company;
      next();
    } else {
      return res.status(403).send({
        message: "Only a Company Admin is Allowed",
      });
    }
  } catch {
    console.log("Error while checking if isCompanyAdmin", err.message);
    res.status(500).send({
      message: "Some internal server error",
    });
  }
};


 module.exports = {
   verifytoken: verifytoken,
   isAdmin: isAdmin,
   isCompanyAdmin: isCompanyAdmin
 };
