const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../modals/Admin");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      res.status(400).json({ errors: "Please valid admin" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
