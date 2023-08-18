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
                require("./routes/homePage/main")(app, isEmailValid, config);
            }).catch((err) => {
                console.log("Mongodb connected failed!!!! " + err);
            });
    }
});


function isEmailValid(email) {
    if (!email)
        return false;
    // console.log("1");
    if (email.length > 254)
        return false;
    // console.log("2");

    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    var valid = emailRegex.test(email);
    if (!valid)
        return false;
    // console.log("3");

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if (parts[0].length > 64)
        return false;
    // console.log("4");

    var domainParts = parts[1].split(".");
    if (domainParts.some(function(part) { return part.length > 63; }))
        return false;
    // console.log("5");
    return true;
}