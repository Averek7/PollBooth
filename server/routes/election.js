const router = require("express").Router();
const Election = require("../modals/Election");
const User = require("../modals/User");
const fetchuser = require("../middleware/fetchuser");

router.put("/:electionid/start_polling", fetchuser, async (req, res) => {
  try {
    const user_id = req.user.id;
    const check = await User.findOne({ user_id });

    if (check) {
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

router.put(":/electionid/end_polling", fetchuser, async (req, res) => {
  try {
    const user_id = req.user.id;
    const check = await User.findOne({ user_id });

    if (check) {
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

module.export = router;
