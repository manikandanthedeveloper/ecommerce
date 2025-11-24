const jwt = require("jsonwebtoken");

const createToken = async (user) => {
	const token = await jwt.sign(
		{ id: user.id || user._id, role: user.role },
		process.env.JWT_SECRET_KEY,
		{ expiresIn: "7d" }
	);
	return token;
};

module.exports = createToken;
