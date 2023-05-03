const Router = require("express").Router;
const authController = require("../controllers/auth.js");
const router = new Router();
const getusers = require("../middlewares/getusers");

router.post("/regitser", authController.onRegister);
router.post("/login", authController.onLogin);
router.get("/getuser", getusers, authController.onGet);

module.exports = router;
