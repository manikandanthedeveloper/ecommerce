const mongoose = require("mongoose");

module.exports = async function connectToDatabase() {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
};
