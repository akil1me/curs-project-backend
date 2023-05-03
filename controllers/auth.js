const User = require("../models/user");
const Role = require("../models/roles");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

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

      const user = await User.create({
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
  async onLogin(req, res) {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({ email });
      console.log(findUser);
      if (!findUser) {
        res.status(400).json({ message: `${email} user not found` });
      }
      const isPasswordValid = bcrypt.compareSync(password, findUser.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const user = {
        id: findUser._id,
        email,
      };

      const token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      res.json({ user, token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Login error" });
    }
  }
  async onGet(req, res) {
    try {
      const users = await User.find();

      res.json({ users });
    } catch (error) {
      console.log(error);
      res.status(400).json("Error get user");
    }
  }
}

module.exports = new Auth();
