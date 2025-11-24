const { Schema, model } = require("mongoose");

const sellerCustomerSchema = new Schema(
	{
		sellerId: {
			type: Schema.Types.ObjectId,
			ref: "sellers",
			required: true,
		},
		customers: {
			type: Array,
			ref: "customers",
			default: [],
		},
	},
	{ timestamps: true }
);

const sellerCustomerModel = model("seller_customers", sellerCustomerSchema);

module.exports = sellerCustomerModel;
