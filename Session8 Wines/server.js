var express = require("express");
const mongoose = require('mongoose');
var fs = require("fs");
var bodyParser = require("body-parser");

var app = express();
//for render
app.set("view engine", "ejs");
//where to render
app.set("views", "./views");
//middleware, all route user call will go to public folder first
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000);

fs.readFile("./config.json", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        var config = JSON.parse(data);
        mongoose.connect(config.dbConnectionString)
            .then(() => {
                console.log("Mongodb connected successfully!!!!");
                require("./routes/homePage/main")(app);
            }).catch((err) => {
                console.log("Mongodb connected failed!!!! " + err);
            });
    }
});