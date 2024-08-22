const express = require('express')
const router = express.Router()
const middleWare = require("../middlewares/auth.middlewares")


const controllers = require("../controllers/user.controllers")
router.post("/register",controllers.register);
router.post("/login",controllers.login);
router.post("/logout",middleWare.requireAuth,controllers.logout);
router.get("/detail",middleWare.requireAuth,controllers.detail);
router.get("/list",middleWare.requireAuth,controllers.list);

router.post("/password/forgot",controllers.forgotPassword);
router.post("/password/otp",controllers.otpPassword);

router.post("/password/reset",controllers.resetPassword);


module.exports = router