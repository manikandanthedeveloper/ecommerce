const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dbConnect = require("./utils/db");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.json());

// Import Routers
// Use Routers
app.use("/api", authRouter);

// Sample route
app.get("/", (req, res) => {
	res.send("E-commerce Backend is running");
});

// Connect to MongoDB
dbConnect();

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
