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
listProducts = [
    { name: "iPhone 12 Pro", price: 16000000, img: "./iphones/12Pro.jpg" },
    { name: "iPhone 13", price: 20000000, img: "./iphones/13.jpg" }
]
app.get("/products", (req, res) => {
    res.render("master", { page: "products", arrProducts: listProducts });
});

app.get("/productDetail/:name", (req, res) => {
    product = listProducts.find(x => x.name === req.params.name);
    res.render("master", { page: "productDetail", product: product });
});