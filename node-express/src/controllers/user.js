"use strict";
const userService = require("../services/user.service");

class User {
  static async signup(req, res) {
    try {
      const { name, username, password } = req.body.input;
      const response = await userService.createUser(
        name,
        username,
        password,
        req.headers
      );
      if (!response) {
        return res.status(404).json({
          message: `not found`,
        });
      }
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Unexpected Error occured while signing up.",
      });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body.input;
      const response = await userService.login(username, password, req.headers);
      if (!response) {
        return res.status(204).json({
          message: "Incorrect Username or password",
        });
      }
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Unexpected Error occured while signing up.",
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { username } = req.body.input;
      const response = await userService.deleteUser(username, req.headers);
      if (!response) {
        return res.status(204).json({
          message: "Username not found",
        });
      }
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Unexpected Error occured while signing up.",
      });
    }
  }
}

module.exports = {
  signup: User.signup,
  login: User.login,
  delete: User.deleteUser,
};
