const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    Email: String,
    Token: String,
    Status: Boolean,
    RegisterDate: Date,
    UserType: Number
});
module.exports = mongoose.model("tokens", userSchema);