const {refreshTokenBodyValidation} = require("../utils/validationSchema.js");
const verifyRefreshToken = require("../utils/verifyRefreshToken.js");
const jwt = require("jsonwebtoken");


// get new access token
const refreshToken = (req, res) => {
    const { error } = refreshTokenBodyValidation(req.body);
    if (error)
        return res
            .status(400)
            .json({ error: true, message: error.details[0].message });

    verifyRefreshToken(req.body.refreshToken)
        .then(({ tokenDetails }) => {
            const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
            const accessToken = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_PRIVATE_KEY,
                { expiresIn: "14m" }
            );
            res.status(200).json({
                error: false,
                accessToken,
                message: "Access token created successfully",
            });
        })
        .catch((err) => res.status(400).json(err));
}

module.exports = refreshToken