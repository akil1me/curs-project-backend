const Router = require("express");
const authController = require("../controllers/auth.js");
const router = new Router();

router.post("/regitser", authController.onRegister);
router.post("/login", authController.onLogin);
router.get("/getuser", authController.onGet);

module.exports = router;
