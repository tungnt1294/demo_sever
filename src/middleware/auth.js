const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
	const token = req.header("x-access-token");
	if (!token)
		return res
			.status(403)
			.json({ error: true, message: "Access Denied: No token provided" });

	try {
		req.user = jwt.verify(
			token,
			process.env.ACCESS_TOKEN_PRIVATE_KEY
		);
		next();
	} catch (err) {
		console.log(err);
		res
			.status(403)
			.json({ error: true, message: "Access Denied: Invalid token" });
	}
};

module.exports = auth;
