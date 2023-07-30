var express = require("express");
var app = express();
//for render
app.set("view engine", "ejs");
//where to render
app.set("views", "./views");
//middleware, all route user call will go to public folder first
app.use(express.static("public"));
app.listen(3000);


app.get("/", (req, res) => {
    res.render("master", { page: "home" });
});


app.get("/register", (req, res) => {

    res.render("master", { page: "register" });

});

app.get("/products", (req, res) => {
    arrProducts = [
        { name: "iPhone 12 Pro", price: 16000000, img: "theJupiter.jpg" },
        { name: "iPhone 13", price: 20000000, img: "theMoon.jpg" },
        // { name: "iPhone 14", price: 3000000000000, img: "theSun.jpg" }
    ]
    page = "products";
    res.render("master");
});

app.get("/productDetail/:name", (req, res) => {
    arrProducts = [
        { name: "iPhone 12 Pro", price: 16000000, img: "theJupiter.jpg" },
        { name: "iPhone 13", price: 20000000, img: "theMoon.jpg" },
        { name: "iPhone 14", price: 3000000000000, img: "theSun.jpg" }
    ]
    res.render("master", { page: "productDetail", product });
});