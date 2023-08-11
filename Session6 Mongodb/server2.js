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
studentModel.findByIdAndUpdate("64c7a0553251d0d76b11a611", { birthYear: 2005 })
    .then((data) => { //data này là data cũ chưa update
        console.log(data);
        console.log("Update okay");

    }).catch((err) => {
        console.log("Update failed");
    });
studentModel.findById("64c7a0553251d0d76b11a611")
    .then((student) => { //data này là data cũ chưa update
        if (student == null) {
            console.log("Not found");
        } else {
            student.birthYear = 2009; //student hiện tại vẫn ở trên node, chưa update lên database
            student.save()
                .then(() => {
                    console.log("Okay");
                });
        }
    }).catch((err) => {
        console.log("Found failed");
    });

studentModel.findByIdAndDelete("64c7a0553251d0d76b11a611")
    .then((data) => { //data trước khi bị delete
        console.log(data);
        console.log("Delete okay");

    }).catch((err) => {
        console.log("Delete failed");
    });