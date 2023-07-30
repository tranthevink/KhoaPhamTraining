var express = require("express");
var app = express();
//for render
app.set("view engine", "ejs");
//where to render
app.set("views", "./views");
//middleware, all route user call will go to public folder first
app.use(express.static("public"));
app.listen(3000);

app.get("/check", function(req, res) {
    var myArray = ["theMoon.jpg", "theJupiter.jpg", "theSun.jpg"];
    res.render("home3", {
        arrImgs: myArray
    });
});


app.get("/", function(req, res) {
    var myHoney = "Bill^^";
    res.render("home", {
        hoten: myHoney,
        number1: 10,
        number2: 5
    });
});

app.get("/random", function(req, res) {
    var myArray = ["theMoon.jpg", "theJupiter.jpg", "theSun.jpg"];
    var randomIndex = Math.floor(Math.random() * (myArray.length));
    res.render("home2", {
        picture: myArray[randomIndex]
    });
});
app.get("/randomCards", function(req, res) {
    var cardsArray = randomCards();
    console.log(cardsArray.length);
    res.render("home3", {
        arrImgs: cardsArray
    });
});

function randomCards() {
    var cardsArray = [];
    var typesArray = ["a", "b", "c", "d"];
    var tempRandomNumbers = [];
    var tempTypes = [];

    while (cardsArray.length !== 52) {
        var randomNumber = Math.floor(Math.random() * 13) + 1;
        var randomType = Math.floor(Math.random() * 4);
        var cardPicture = randomNumber + typesArray[randomType] + ".png";
        if (cardsArray.indexOf(cardPicture) === -1) {
            cardsArray.push(cardPicture);
        }
    }
    return cardsArray;
}