const express = require("express");
const cors = require("cors");
const connectToAtlas = require("./config/db");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToAtlas();

// routes
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`>Server Running...${PORT}`);
});

app.get("/", function (req, res) {
  res.send("WELCOME To PollBooth");
});
