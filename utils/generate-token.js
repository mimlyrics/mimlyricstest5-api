const jwt = require("jsonwebtoken");

const generateToken = (res, userId, {isAdmin, isEditor}) => {
    const refreshToken = jwt.sign({userId, isAdmin, isEditor}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "5d" 
    })
    console.log(refreshToken);
    return refreshToken;
}

const generateAccessToken = (res, userId, {isAdmin, isEditor}) => {
    console.log("XXXXXXXXXX_isAdmin: ", isAdmin);
    const accessToken = jwt.sign({userId, isAdmin, isEditor}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3d" 
    })
    return accessToken;
}


module.exports = {generateToken, generateAccessToken};