const jwt = require("jsonwebtoken");
const responser = require("../utils/responser");

const authMiddleware = async (req, res, next) => {
	const { accessToken } = req.cookies;
	if (!accessToken) {
		return responser.responseError(
			res,
			"Please login to access this resource",
			401
		);
	} else {
		try {
			const decoded = await jwt.verify(
				accessToken,
				process.env.JWT_SECRET_KEY
			);

			req.id = decoded.id;
			req.role = decoded.role;

			next();
		} catch (err) {
			return responser.responseError(res, `Invalid token: ${err}`, 401);
		}
	}
};

module.exports = authMiddleware;
