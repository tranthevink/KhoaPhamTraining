var express = require("express");
var app = express();
//for render
app.set("view engine", "ejs");
//where to render
app.set("views", "./views");
//middleware, all route user call will go to public folder first
app.use(express.static("public"));
app.listen(3000);

app.get("/", function(req, res) {
    var myHoney = "Bill^^";
    res.render("home", {
        hoten: myHoney,
        number1: 10,
        number2: 5
    });
});

app.get("/random", function(req, res) {
    var myHoney = "Bill^^";
    var myArray = ["theMoon.jpg", "theJupiter.jpg", "theSun.jpg"];
    var randomIndex = Math.floor(Math.random() * (myArray.length));
    res.render("home", {
        hoten: myHoney,
        number1: 10,
        number2: 5,
        picture: myArray[randomIndex]
    });
});