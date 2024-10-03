const express = require('express');
const router = express.Router();
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middlewares/authMiddleware")
const isAuth = authMiddleware.isAuth;

router.put("/updateProfile/:email", isAuth,  profileController.updateProfile);
router.get("/getProfile/:email", isAuth, profileController.getProfile);
router.delete("/deleteProfile/:email", isAuth, profileController.deleteProfile);

module.exports = router;