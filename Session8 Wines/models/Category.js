const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const categorySchema = new mongoose.Schema({
    Title: String,
    Alias: String,
    Image: String,
    DateCreated: Date,
    Status: Number
});
categorySchema.plugin(autoIncrement, { inc_field: "Ordering" });
module.exports = mongoose.model("Categories", userSchema);