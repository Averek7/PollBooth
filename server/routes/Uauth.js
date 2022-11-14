const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modals/User");

const JWT_SECRET = "secret_token_user";

router.post("/signup", async (req, res) => {
  const {
    username,
    password,
    name,
    age,
    gender,
    phone_no,
    region,
    aadhar,
    organisation,
  } = req.body;
  try {
    let check_user = await User.findOne({ username });
    if (!check_user) {
      res.status(404).json({ errors: "Please valid username" });
    }

    // Hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // New User
    let user = await User.create({
      username,
      password: hashPassword,
      name,
      age,
      gender,
      phone_no,
      region,
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
      message: `Successfully Merged User ${name}`,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred", { message: "Failed Sign Up" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username, type: "V" });
    if (!user) {
      res.status(440).json({ errors: "Please valid username" });
    }
    const cPassword = await bcrypt.compare(password, user.password);
    if (!cPassword) {
      res.status(400).json({ errors: "Please enter correct credentials" });
    }

    const payLoad = {
      admin: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(payLoad, JWT_SECRET);
    res.json({
      message: "Successfully Signed In",
      id: user.id,
      name: user.name,
      region: user.region,
      authToken,
    });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
