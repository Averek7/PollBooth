const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modals/User");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "secret_token_user";

router.post("/signup", async (req, res) => {
  const { username, password, aadhar, organisation } = req.body;
  try {
    let check_user = await User.findOne({ username });
    if (check_user) {
      res.status(500).json({ errors: "Sorry ! Username Already Exists" });
    }

    // Hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // New User
    let user = await User.create({
      username,
      password: hashPassword,
      aadhar,
      organisation,
    });

    const data = {
      user: {
        id: user.id,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({
      message: `Successfully Merged User ${username}`,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred", { message: "Failed Sign Up" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      res.status(440).json({ errors: "Please valid username" });
    }
    const cPassword = await bcrypt.compare(password, user.password);
    if (!cPassword) {
      res.status(400).json({ errors: "Please enter correct credentials" });
    }

    const payLoad = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(payLoad, JWT_SECRET);
    res.json({
      message: "Successfully Signed In",
      id: user.id,
      name: user.name,
      authToken,
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/view_profile", fetchuser, async (req, res) => {
  try {
    let profile = await User.findById(req.user.id).select("-password");
    res.json({ message: "Profile Fetched", profile });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occurred", { message: "Fetching Failed" });
  }
});

router.get("/view_user", async (req, res) => {
  try {
    const { username } = req.body;
    let user = await User.findOne({ username }).select("-password");
    console.log(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occurred", { message: "Fetching Failed" });
  }
});
module.exports = router;
