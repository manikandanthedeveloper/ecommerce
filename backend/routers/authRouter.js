const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const authController = require("../controllers/authController");

// Admin Login
router.post("/admin/login", authController.adminAuth);
router.get("/admin/user", authMiddleware, authController.getUser);

module.exports = router;
