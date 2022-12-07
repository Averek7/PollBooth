const router = require("express").Router();
const User = require("../modals/User");
const Election = require("../modals/Election");
const fetchuser = require("../middleware/fetchuser");
const { listenerCount } = require("../modals/Election");

router.get("/get_election", async (req, res) => {
  try {
    const election = await Election.find();
    res.json({ message: "Elections Fetched !", election });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occurred");
  }
});

router.get("/:electionID", async (req, res) => {
  try {
    const election_id = req.params.electionID;
    const election = await Election.find({ election_id });
    console.log(election);
    if (!election) {
      return res.status(404).json({ message: "No Election Found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occurred");
  }
});

router.get("/get_candidates", fetchuser, async (req, res) => {
  try {
    const candidate = await User.find();
    res.json(candidate);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occurred");
  }
});

router.post("/:electionID/:candidateID/poll", async (req, res) => {
  try {
    const candidate = await User.findById(req.params.candidateID);
    const election = await Election.findById(req.params.electionID);
    if (!election) {
      return res.json({ message: "No Such Election Exists" });
    }
    for (let index = 0; index < election.votes.length; index++) {
      if (election.votes[index].id.toString() === candidate.id) {
        election.votes[index].count++;
        election.save();
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occurred");
  }
});

router.post(
  "/:electionID/:candidateID/add_candidate",
  fetchuser,
  async (req, res) => {
    try {
      const user = await User.findOne({ user_id: req.user.id });
      if (user.username !== "ADMIN") {
        return res.json({
          message: "Only Admin can add candidate to election",
        });
      }
      const candidate = await User.findById(req.params.candidateID);
      if (candidate) {
        return res.json({ message: "Candidate Already Exists" });
      }
      const election = await Election.findByIdAndUpdate(
        { _id: req.params.electionID },
        {
          $push: {
            votes: {
              id: candidate.id,
              name: candidate.username,
              count: 0,
            },
          },
        }
      );
      return res.json({
        message: `Candidate ${candidate.username} with ${candidate} Added ${election}`,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

router.get("/:electionID/result", async (req, res) => {
  try {
    const result = await Election.findById(req.params.electionID);
    return res.json(result.votes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occurred");
  }
});
module.exports = router;
