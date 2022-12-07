const mongoose = require("mongoose");
// const Mongo_URI = `mongodb+srv://mongo:mongopassword@cluster0.jnr6ncq.mongodb.net/?retryWrites=true&w=majority`;
const Mongo_URI = `mongodb://localhost:27017/pollbooth?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;

const connectToAtlas = () => {
  mongoose
    .connect(Mongo_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log("> Connected..."))
    .catch((err) =>
      console.log(`> Error while connecting to mongoDB : ${err.message}`)
    );
};

module.exports = connectToAtlas;
