const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema({});

const Admin = mongoose.model("admins", AdminSchema);
module.exports = Admin;
