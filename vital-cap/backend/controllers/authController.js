const authService = require("../services/authService");
const authMethod =require("../helper/authMethod");
const Users = require("../models/Users");
const authConfig = require("../helper/authConfig");
exports.signup = async (req, res) => {
    try {
        const userData = req.body;
        const response = await authService.signup(userData);
        if (response.user) {
            res.status(200).json(response);
        } else {
            res.status(400).json(response);
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.login = async (req, res) => {
    try {
        const data = req.body;
        const response = await authService.login(data);
        if (response.user) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}




exports.refreshToken = async (req,res) => {
    let accessTokenFromHeader = req.headers.authorization;
    if(!accessTokenFromHeader){
        return res.status(400).send("cant find access token");
    }
    const tokenParts = accessTokenFromHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res.status(401).json({ message: "Invalid token format" });
    }

    accessTokenFromHeader = tokenParts[1];

    // TO DO: correct typo "refeshToken" to "refreshToken"
    const refreshTokenFromBody = req.body.refreshToken;
    if(!refreshTokenFromBody){
        return res.status(400).send("cant find refresh token");
    };

    // TO DO: use singleton to initialize accessTokenSecret for the whole application
    // TO DO: use singleton to initialize accessTokenLife for the whole application
    // const accessTokenLife = "30m";
    // const accessTokenSecret = "vital_cap_24";
    const accessTokenLife = authConfig.accessTokenLife;
    const accessTokenSecret = authConfig.accessTokenSecret;


    const decoded = await authMethod.decodeToken(
        accessTokenFromHeader,
        accessTokenSecret
    )

    if(!decoded){
        return res.status(400).send("not suitable access token");
    }
    const userEmail = decoded.payload.email;
    const user = await Users.getUserByEmail(userEmail);
    if(!user){
        return res.status(400).send("users does not exist");
    }

    if(refreshTokenFromBody != user.refreshToken){
        return res.status(400).send("not suitable refresh token");
    }

    const dataForToken = {
        email: userEmail
    }

    // TO DO: this should be an async call, generateToken takes time to execute
    const accessToken = await authMethod.generateToken(
        dataForToken,
        accessTokenSecret,
        accessTokenLife 
    )

    if(!accessToken){
        return res.status(400).send("cant create token");
    }

    return res.json({
        accessToken
    })



}