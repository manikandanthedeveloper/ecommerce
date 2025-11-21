const jwt = require("jsonwebtoken");

const createToken = async (user) => {
	const token = await jwt.sign(
		{ id: user._id, role: user.role },
		process.env.JWT_SECRET,
		{ expiresIn: "1d" }
	);
	return token;
};

module.exports = createToken;
