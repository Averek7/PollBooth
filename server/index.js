const express = require("express");
const cors = require("cors");
const connectToAtlas = require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectToAtlas();

// routes

app.listen(PORT, () => {
  console.log(`>Server Running...${PORT}`);
});
