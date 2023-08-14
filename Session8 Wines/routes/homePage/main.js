var User = require("../../models/User");
var bcrypt = require('bcryptjs');


module.exports = function(appParam) {
    appParam.get("/", (req, res) => {
        var myUser = new User({
            Email: String,
            Password: String,

            Avatar: String,

            Active: Boolean,
            RegisterDate: Date,

            Socket: String
        });
        res.json({ sayHi: "Hello" });
    });
    appParam.post("/register", function(req, res) {
        console.log(req);
        if (!req.body.Email || !req.body.Password) {
            res.json({ result: 0, message: "Wrong parameters" })
        } else {
            bcrypt.genSalt(10, function(err, salt) { //the number of 10 or 15 shows the difficulty of 
                bcrypt.hash(req.body.Password, salt, function(err, hash) {
                    var myUser = new User({
                        Email: req.body.Email,
                        Password: hash
                    });
                    myUser.save()
                        .then((data) => {
                            res.json({ result: 1, message: "Save new user successfully.", data: data });
                        })
                        .catch((err) => {
                            res.json({ result: 0, message: "Save new user failed.", data: err });
                        });
                });
            });

        }
    })
};