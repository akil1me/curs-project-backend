const User = require("../models/user");
const Role = require("../models/roles");
const bcrypt = require("bcrypt");

class Auth {
  async onRegister(req, res) {
    try {
      const { email, username, password } = req.body;
      const findUser = await User.findOne({ email });
      if (findUser) {
        return res
          .status(400)
          .json({ message: "The user of this email is already registered" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        email,
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      res.json({ message: "User successfully registered" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async onLogin() {
    try {
    } catch (error) {
      console.log(error);
      req.status(400).json({ message: "Login error" });
    }
  }
  async onGet(req, res) {
    try {
      res.json("server start");
    } catch (error) {}
  }
}

module.exports = new Auth();
