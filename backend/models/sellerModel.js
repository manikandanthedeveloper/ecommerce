const { Schema, model } = require("mongoose");

const sellerSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, select: false },
		role: { type: String, default: "seller" },
		status: {
			type: String,
			enum: ["pending", "approved", "rejected"],
			default: "pending",
		},
		payment: { type: String, default: "inactive" },
		method: { type: String, required: true },
		image: { type: String, default: "" },
		storeInfo: { type: Object, default: {} },
	},
	{ timestamps: true }
);
const sellerModel = model("sellers", sellerSchema);

module.exports = sellerModel;
