const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const authController = require("../controllers/authController");

// Admin Login
router.post("/admin/login", authController.admin_login);
router.get("/getuser", authMiddleware, authController.get_user);
router.post("/seller/register", authController.seller_register);
router.post("/seller/login", authController.seller_login);

module.exports = router;
