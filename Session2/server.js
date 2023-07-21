var express = require("express");
var app = express();
app.listen(3000);

app.get("/", function(req, res) {
    1res.send("Hello");
});1

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