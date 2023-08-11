var express = require("express");
var app = express();
//for render
app.set("view engine", "ejs");
//where to render
app.set("views", "./views");
//middleware, all route user call will go to public folder first
app.use(express.static("public"));
app.listen(3000);

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://tranthevink:p2mGCsZ5b3yCc9d6@cluster0.upzqyeq.mongodb.net/Mean2023_01')
    .then(() => {
        console.log("Mongodb connected successfully!!!!");
    }).catch(() => {
        console.log("Mongodb connected failed!!!!");
    });

var studentModel = require("./models/Student");

app.get("/new/:name/:birthYear", (req, res) => {
    var mySelf = new studentModel({
        name: req.params.name,
        birthYear: req.params.birthYear,
        sex: true, //true: male, false: female
        registerDate: Date.now()
    });
    mySelf.save()
        .then((data) => {
            res.json({ result: 1, message: "Save new student successfully.", data: data });
        })
        .catch((err) => {
            res.json({ result: 0, message: "Save new student failed.", data: err });
        })
});

//get data
app.get("/list", (req, res) => {
    studentModel.find({ birthYear: { $lt: 1997 } }, { name: 1, birthYear: 1, _id: 1, order: 1 })
        .sort({ order: 1 }) //1 ascending, -1 descending
        .then((data) => {
            // res.json({ result: 1, message: "Okay.", data: data });
            res.render("student", { students: data });
        })
        .catch((err) => {
            res.json({ result: 0, message: "Failed.", data: err });
        });
});

//find > []
//findOne, findById > Object/Null
app.get("/list2", (req, res) => {
    studentModel.findOne({ birthYear: 1996 })
        .then((data) => {
            res.json({ result: 1, message: "Okay.", data: data });
        })
        .catch((err) => {
            res.json({ result: 0, message: "Failed.", data: err });
        });
});

app.get("/list3", (req, res) => {
    studentModel.findById("64ca3ad710634ceae6ed762c")
        .then((data) => {
            res.json({ result: 1, message: "Okay.", data: data });
        })
        .catch((err) => {
            res.json({ result: 0, message: "Failed.", data: err });
        });
});

studentModel.findById("64c7a0553251d0d76b11a611", { birthYear: 2005 })
    .then((data) => {
        console.log(data);
        console.log("Update okay");
    }).catch((err) => {
        console.log("Update failed");
    });