var express = require("express");
const mongoose = require('mongoose');
var fs = require("fs");

var app = express();
//for render
app.set("view engine", "ejs");
//where to render
app.set("views", "./views");
//middleware, all route user call will go to public folder first
app.use(express.static("public"));
app.listen(3000);


app.get("/", (req, res) => {

});

fs.readFile("./config.json", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        var config = JSON.parse(data);
        mongoose.connect(config.dbConnectionString)
            .then(() => {
                console.log("Mongodb connected successfully!!!!");
            }).catch(() => {
                console.log("Mongodb connected failed!!!!");
            });
    }
});