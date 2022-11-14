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
app.use("/api/pauth", require("./routes/Aauth"));
app.use("/api/vauth", require("./routes/Uauth"));

app.listen(PORT, () => {
  console.log(`>Server Running...${PORT}`);
});
