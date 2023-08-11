const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    name: String,
    birthYear: Number,
    sex: Boolean, //true: male, false: female
    registerDate: Date,
    order: Number
});
module.exports = mongoose.model("students", studentSchema);