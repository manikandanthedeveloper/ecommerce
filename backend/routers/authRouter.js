const router = require("express").Router();
const authController = require("../controllers/authController");

// Admin Login
router.post("/admin/login", authController.adminAuth);

module.exports = router;
