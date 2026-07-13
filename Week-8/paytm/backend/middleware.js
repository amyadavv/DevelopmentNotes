const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config")


function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({
            message: "Invalid request"
        })
    }

    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(token, JWT_SECRET);

        if (decode.userId) {
            req.userId = decode.userId;
            next();
        }
        else {
            return res.status(403).json({})
        }

    } catch (err) {
        return res.status(403).json({
            message: "Invalid token"
        })
    }

}

module.exports = { authMiddleware };


// Check for the token is present or not, then check if the token is start from Bearer or not.
// Then split the Bearer part and get the token
// verify the token and get the user id 