const express = require("express");
const user = require("../controllers/user");

const router = express.Router();

// Signup
router.post("/signup", user.signup);
router.post("/login", user.login);
router.post("/delete", user.delete);

module.exports = router;
