const bcrypt = require("bcrypt");
const adminModel = require("../models/adminModel");
const sellerModel = require("../models/sellerModel");
const sellerCustomerModel = require("../models/chat/sellerCustomerModel");
const { responseSuccess, responseError } = require("../utils/responser");
const createToken = require("../utils/createToken");

class authController {
	admin_login = async (req, res, next) => {
		const { email, password } = req.body;
		try {
			const user = await adminModel.findOne({ email, role: "admin" });
			if (user) {
				const isPasswordValid = await bcrypt.compare(
					password,
					user.password
				);
				if (isPasswordValid) {
					const token = await createToken({
						id: user._id,
						role: user.role,
					});
					res.cookie("accessToken", token, {
						httpOnly: true,
						secure: true,
						sameSite: "None",
						expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
					}); // 1 day
					
					// Return user data without password
					const userResponse = {
						_id: user._id,
						name: user.name,
						email: user.email,
						role: user.role,
					};
					
					return responseSuccess(res, { token, user: userResponse, message: "Login successful" }, 200);
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

	seller_login = async (req, res, next) => {
		const { email, password } = req.body;
		try {
			const seller = await sellerModel
				.findOne({ email })
				.select("+password");
			if (seller) {
				if (!seller.password) {
					return responseError(
						res,
						"Invalid account. Please contact support.",
						400
					);
				}

				const isPasswordValid = await bcrypt.compare(
					password,
					seller.password
				);
				if (isPasswordValid) {
					const token = await createToken({
						id: seller._id,
						role: seller.role,
					});
					res.cookie("accessToken", token, {
						httpOnly: true,
						secure: true,
						sameSite: "None",
						expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
					}); // 1 day
					
					// Return user data without password
					const userResponse = {
						_id: seller._id,
						name: seller.name,
						email: seller.email,
						role: seller.role,
						shopInfo: seller.shopInfo,
						status: seller.status,
					};
					
					return responseSuccess(res, { token, user: userResponse, message: "Login successful" }, 200);
				} else {
					return responseError(res, "Invalid password", 401);
				}
			} else {
				return responseError(res, "User not found", 404);
			}
		} catch (err) {
			console.error("Seller login error:", err);
			return responseError(res, "Server error", 500);
		}
	};

	get_user = async (req, res, next) => {
		const { id, role } = req;
		try {
			if (role === "admin") {
				const user = await adminModel.findById(id);
				if (user) {
					return responseSuccess(res, { user }, 200);
				} else {
					return responseError(res, "User not found", 404);
				}
			} else if (role === "seller") {
				const user = await sellerModel.findById(id);
				if (user) {
					return responseSuccess(res, { user }, 200);
				} else {
					return responseError(res, "User not found", 404);
				}
			} else {
				return responseError(res, "Unauthorized access", 403);
			}
		} catch (err) {
			return responseError(res, "Server errors", 500);
		}
	};

	seller_register = async (req, res, next) => {
		const { name, email, password } = req.body;
		try {
			const existingUser = await sellerModel.findOne({ email });
			if (existingUser) {
				return responseError(res, "User already exists", 409);
			}
			const hashedPassword = await bcrypt.hash(password, 10);
			const newUser = new sellerModel({
				name,
				email,
				password: hashedPassword,
				method: "manual",
				shopInfo: {},
			});
			const savedUser = await newUser.save();
			const newSellerCustomer = new sellerCustomerModel({
				sellerId: savedUser._id,
			});
			await newSellerCustomer.save();
			const token = await createToken({
				id: savedUser._id,
				role: savedUser.role,
			});
			res.cookie("accessToken", token, {
				httpOnly: true,
				secure: true,
				sameSite: "None",
				expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
			}); // 1 day
			
			// Return user data without password
			const userResponse = {
				_id: savedUser._id,
				name: savedUser.name,
				email: savedUser.email,
				role: savedUser.role,
				shopInfo: savedUser.shopInfo,
				status: savedUser.status,
			};
			
			return responseSuccess(
				res,
				{ token, user: userResponse, message: "User created successfully" },
				201
			);
		} catch (err) {
			return responseError(res, "Internal server error", 500);
		}
	};
}

module.exports = new authController();
