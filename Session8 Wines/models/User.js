const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    Email: String,
    Password: String,

    Avatar: String,

    Active: Boolean,
    RegisterDate: Date,

    Socket: String
});
module.exports = mongoose.model("users", userSchema);