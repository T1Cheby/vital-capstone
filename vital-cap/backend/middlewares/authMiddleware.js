const authConfig = require("../helper/authConfig");
const authMethod = require("../helper/authMethod");
const Users = require("../models/Users");

exports.isAuth = async (req, res, next) => {
    // add the mechanism to automatically generate refresh or something?
    // add the mechanism to use the refresh to generate the new one
    // add the mechanism to filter users by role
    let accessTokenFromHeader = req.headers.authorization;
    console.log(accessTokenFromHeader)


    if(!accessTokenFromHeader){
        return res.status(401).send("not found Token");
    }

    const tokenParts = accessTokenFromHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ message: "Invalid token format" });
    }

    accessTokenFromHeader = tokenParts[1];

    // TO DO: use singleton to initialize accessTokenSecret for the whole application
    // const accessTokenSecret = "vital_cap_24";
    const accessTokenSecret = authConfig.accessTokenSecret;

    const verified = await authMethod.verifyToken(accessTokenFromHeader, accessTokenSecret);

    if(!verified){
        return res.status(401).send("You are not allowed to access this service!");
    }

    // if (verified.payload.email !== req.params.email){
    //     // console.log(verified.email !== req.params.email)
    //     return res.status(401).send("You are not allowed to access this service!");
    // }


    const tokenExpiryDate = new Date(verified.payload.exp * 1000);
    const currentTime = new Date();

    if (tokenExpiryDate < currentTime) {
        return res.status(401).send("Access token expired. Please refresh your token.");
    }

    const user =await Users.getUserByEmail(verified.payload.email);

    // console.log(user);
    req.user = user;

    return next();
}