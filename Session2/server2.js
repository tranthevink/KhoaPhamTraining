var express = require("express");
var bodyParser = require('body-parser');

var app = express();
//open port 3001
app.listen(3001);


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post("/total", function(req, res) {
    if (!req.body.no1 || !req.body.no2) {
        res.json({ result: 0, message: "Wrong parameters" })

    } else {
        var no1 = parseInt(req.body.no1);
        var no2 = parseInt(req.body.no2);
        var total = no1 + no2;
        res.json({ result: 1, message: "Ok", total: total });
    }
});