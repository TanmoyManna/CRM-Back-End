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


// Middleware to check if user is a company Admin or user
const isCompanyAdminOrUser = async (req, res, next) => {
  try {
    const userObj = await User.findOne({ _id: req.userId });
    if (userObj && (userObj.userType == 'COMPANY_ADMIN' || userObj.userType == 'MANAGER' || userObj.userType == 'TELECALLER')) {
      req['companyId'] = userObj.company;
      next();
    } else {
      return res.status(403).send({
        message: "Admin is not Allowed",
      });
    }
  } catch {
    console.log("Error while checking if isCompanyAdminOrUser", err.message);
    res.status(500).send({
      message: "Some internal server error",
    });
  }
};

/**
 * Middleware to check if the user is Company Admin or the owner
 */
const isCompanyAdminOrOwner = async (req, res, next) => {
  
  const callingUser = await User.findOne({ userId: req.userId });

  if (callingUser.userType == "COMPANY_ADMIN" || callingUser._id == req.params.id) {

    if (req.body.userStatus && callingUser.userType != 'ADMIN') {
      return res.status(403).send({
        message: "Only ADMIN is allowed to change the status",
        status: 403
      });
    }
    req['companyId'] = callingUser.company;
    next();
  } else {
    return res.status(403).send({
      status: 403,
      message: "Only ADMIN or owner of the resource is allowed to update"

    })
  }
}


module.exports = {
  verifytoken: verifytoken,
  isAdmin: isAdmin,
  isCompanyAdmin: isCompanyAdmin,
  isCompanyAdminOrUser: isCompanyAdminOrUser,
  isCompanyAdminOrOwner: isCompanyAdminOrOwner
};
