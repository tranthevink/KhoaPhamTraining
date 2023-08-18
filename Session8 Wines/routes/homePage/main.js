var User = require("../../models/User");
var bcrypt = require('bcryptjs');


module.exports = function(appParam, isEmailValid, config) {
    appParam.get("/", (req, res) => {
        res.send("Hello world");
    });

    appParam.post("/register", function(req, res) {
        //user uses for registering with 
        //Email: String, Password: String
        // Return: {result:0/1, mesage:""}
        if (!req.body.Email || !req.body.Password) {
            res.json({ result: 0, message: "Wrong parameters!" })
        } else {
            var email = req.body.Email.trim().toLowerCase();
            var password = req.body.Password;
            //check email template
            if (!isEmailValid(email)) {
                res.json({ result: 0, message: "Wrong email!" });
            } else if (password.length < config.validateFormat.minPasswordLength) {
                //Note: Check do phuc tap cuar pw: PHai co Number, Text, Uppercase, 
                res.json({ result: 0, message: "Wrong password's length!" })
            } else {
                //check existing email
                User.findOne({}).then((data) => {
                    if (data != null) {
                        res.json({ result: 0, message: "The email was used!" })
                    } else {
                        bcrypt.genSalt(config.saltRounds, function(err, salt) {
                            bcrypt.hash(password, salt, function(err, hash) {
                                if (err) {
                                    res.json({ result: 0, message: "Password hash failed!" })
                                } else {
                                    //save new user to database
                                    var newUser = new User({
                                        Email: email,
                                        Password: hash,
                                        Avatar: "avatar.jpg",
                                        RegisterDate: Date.now(),
                                        Socket: ""
                                    });
                                    newUser.save().then((data) => {
                                        res.json({ result: 1, message: "Registered successfully!", user: data });
                                    }).catch((err) => {
                                        res.json({ result: 0, message: "User saved error!" });
                                    })
                                }
                            });
                        });

                    }
                }).catch((err) => {
                    res.json({ result: 0, message: "Check Email existing failed!" })
                })
            }
        }
    });
    appParam.post("/login", (req, res) => {
        if (!req.body.Email || !req.body.Password) {
            res.json({ result: 0, message: "Wrong parameters!" })
        } else {
            //check existing email
            var email = req.body.Email.trim().toLowerCase();
            var password = req.body.Password;
            User.findOne({ Email: email })
                .then((user) => {
                    if (user != null) {
                        res.json({ result: 1, message: "Login successfully!" })
                    } else {
                        res.json({ result: 0, message: "Email has not been registered!" })
                    }
                }).catch((err) => {
                    res.json({ result: 0, message: "check email throw exception!" });
                });
            //check password
        }
    });
};