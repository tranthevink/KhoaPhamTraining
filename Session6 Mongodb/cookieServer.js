var express = require("express");
var cookie = require('cookie');
var cookieParser = require('cookie-parser')
var app = express();
//for render
app.set("view engine", "ejs");
//where to render
app.set("views", "./views");
//middleware, all route user call will go to public folder first
app.use(express.static("public"));
app.listen(3000);
app.use(cookieParser());


app.get("/dashboard", (req, res) => {
    console.log(req.cookies.MYNAME);
    res.render("dashboard");
});