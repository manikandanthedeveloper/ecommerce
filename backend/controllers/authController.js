const User = require("../models/adminModel");
const bcrypt = require("bcrypt");
const { responseSuccess, responseError } = require("../utils/responser");
const createToken = require("../utils/createToken");

class authController {
	adminAuth = async (req, res, next) => {
		const { email, password } = req.body;
		try {
			const user = await User.findOne({ email, role: "admin" });
			if (user) {
				const isPasswordValid = await bcrypt.compare(
					password,
					user.password
				);
				if (isPasswordValid) {
					const token = await createToken(user);
					res.cookie("accessToken", token, {
						httpOnly: true,
						secure: true,
						sameSite: "None",
						expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
					}); // 1 day
					return responseSuccess(res, { token }, 200);
				} else {
					return responseError(res, "Invalid password", 401);
				}
			} else {
				return responseError(res, "User not found", 404);
			}
		} catch (err) {
			return responseError(res, "Server error", 500);
		}
	};
}

module.exports = new authController();
