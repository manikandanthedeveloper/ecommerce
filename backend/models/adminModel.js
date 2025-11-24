const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
	{
		name: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, default: "user" },
		image: { type: String },
	},
	{ timestamps: true }
);

const AdminModel = model("admin", adminSchema);

module.exports = AdminModel;
