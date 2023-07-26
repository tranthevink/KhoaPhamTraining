var express = require("express");
var bodyParser = require('body-parser');


var app = express();
//open port 3000
app.listen(3000);


var t = setInterval(runFunction, 1000);


var checkingFunction = function() {

}