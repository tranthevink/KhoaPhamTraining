var express = require("express");
var bodyParser = require('body-parser');


var app = express();
//open port 3000
app.listen(3000);


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
const axios = require('axios');

app.get("/price/:pair", function(req, res) {
    axios.get("https://api.binance.com/api/v3/ticker/price?symbol=" + req.params.pair)
        .then(function(res) {
            console.log(res.data.price);
        }).catch(function(err) {
            res.json({ result: 0, message: "Error from api!" });
        })
});

app.post("/server1/total", function(req, res) {
    if (!req.body.no1 || !req.body.no2) {
        res.json({ result: 0, message: "Wrong parameters" })
    } else {
        axios.post('http://localhost:3001/total', {
                no1: req.body.no1,
                no2: req.body.no2
            })
            .then(function(response) {
                console.log(response.data);
                res.json(response.data);
            })
            .catch(function(error) {
                res.json({ message: "Error from server2" })
            });
    }
});

app.post("/login", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (!username || !password)
        res.json({ result: "Wrong parameter." });
    else {
        console.log("New user has been registered");
        res.json({ result: "New user has been registered", id: username, password: password });
    }

});
//api
app.get("/demo", function(req, res) {
    console.log("Someone is connect to server" + req.eventNames);
    res.send("Welcome to backend server");
});
1

app.get("/register", function(req, res) {
    // res.send({ page: "register", status: "success" });
    res.json({ page: "register", status: "success" });
})

app.post("/register", function(req, res) {
    res.send("PostMethod");
})

app.get("/register/:un/:pw", function(req, res) {
    var username = req.params.un;
    var password = req.params.pw;
    console.log(username);
    res.json({ username: username, password: password });
})