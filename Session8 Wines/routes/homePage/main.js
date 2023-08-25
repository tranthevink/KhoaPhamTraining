var User = require("../../models/User");
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken")
var Token = require("../../models/Token");
//multer
var multer = require('multer');

module.exports = function(appParam, isEmailValid, config) {
    appParam.get("/", (req, res) => {
        res.render("demo");


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
                                        Socket: "",
                                        UserType: 0
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
                        bcrypt.compare(password, user.Password, function(err, isMatch) {
                            if (err) {
                                res.json({ result: 0, message: err })
                            } else if (!isMatch) {
                                res.json({ result: 0, message: "Password doesn't match!" })
                            } else {
                                user.Password = "Hello";
                                jwt.sign({
                                    data: user
                                }, config.secretKey, { expiresIn: 60 * 60 }, (errJwt, token) => {
                                    if (errJwt) {
                                        res.json({ result: 1, message: "Token is invalid!" });
                                    } else {
                                        var newToken = new Token({
                                            Email: email,
                                            Token: token,
                                            Status: true,
                                            UserType: user.UserType,
                                            RegisterDate: Date.now()
                                        });
                                        newToken.save()
                                            .then(() => {
                                                res.json({ result: 1, message: "Login successfully!", token: token });
                                            })
                                            .catch(() => {
                                                res.json({ result: 0, message: "Token was saved failed" });
                                            });
                                    }
                                });
                            }
                        });
                    } else {
                        res.json({ result: 0, message: "Email has not been registered!" });

                    }
                }).catch((err) => {
                    res.json({ result: 0, message: "check email throw exception!" });
                });
            //check password

        }
    });
    appParam.post("/verify", (req, res) => {
        if (!req.body.Token) {
            res.json({ result: 0, message: "Wrong parameters!" })
        } else {
            var token = req.body.Token;
            Token.findOne({ Token: token, Status: true })
                .then((t) => {
                    if (t == null) {
                        res.json({ result: 0, message: "Token has been expired!" })
                    } else {
                        // verify a token symmetric
                        jwt.verify(token, config.secretKey, function(err, decoded) {
                            if (err) {
                                res.json({ result: 0, message: err })
                            } else {
                                res.json({ result: 1, message: "Token is ok!", data: decoded })
                            }
                        });
                    }
                })
                .catch(e => {
                    res.json({ result: 0, message: "Checking token threw a exception!" })
                })
        }
    });

    appParam.post("/logout", (req, res) => {
        if (!req.body.Token) {
            res.json({ result: 0, message: "Wrong parameters!" })
        } else {
            var token = req.body.Token;
            Token.findOne({ Token: token, Status: true })
                .then((t) => {
                    if (t == null) {
                        res.json({ result: 0, message: "Token has been expired!" })
                    } else {
                        // verify a token symmetric
                        Token.findOneAndUpdate({ Token: token }, { Status: false })
                            .then(() => {
                                res.json({ result: 1, message: "Logout Successfully!" })
                            })
                            .catch(e => {
                                res.json({ result: 0, message: "Logout Failed!" })
                            });
                    }
                })
                .catch(e => {
                    res.json({ result: 0, message: "Checking token threw a exception!" })
                })
        }
    });

    // appParam.post("/admin", check, (req, res) => {

    // });

    function checkLogined(req, res, next) {
        if (!req.body.Token) {
            res.json({ result: 0, message: "Wrong parameters!" })
        } else {
            var token = req.body.Token;
            Token.findOne({ Token: token, Status: true })
                .then((t) => {
                    if (t == null) {
                        res.json({ result: 0, message: "Token has been expired!" })
                    } else {
                        // verify a token symmetric
                        jwt.verify(token, config.secretKey, function(err, decoded) {
                            if (err) {
                                res.json({ result: 0, message: err })
                            } else {
                                next();
                            }
                        });
                    }
                })
                .catch(e => {
                    res.json({ result: 0, message: "Checking token threw a exception!" })
                })
        }
    }

    function checkAdmin(req, res, next) {
        if (!req.body.Token) {
            res.json({ result: 0, message: "Wrong parameters!" })
        } else {
            var token = req.body.Token;
            Token.findOne({ Token: token, Status: true })
                .then((t) => {
                    if (t == null) {
                        res.json({ result: 0, message: "Token has been expired!" })
                    } else {
                        // verify a token symmetric
                        jwt.verify(token, config.secretKey, function(err, decoded) {
                            if (err) {
                                res.json({ result: 0, message: err })
                            } else {
                                if (decoded.data.UserType === 1)
                                    next();
                                else
                                    res.json({ result: 0, message: "You must be admin to use this feature!" })

                            }
                        });
                    }
                })
                .catch(e => {
                    res.json({ result: 0, message: "Checking token threw a exception!" })
                })
        }
    }
    //upload file
    const {
        v1: uuidv1,
        v4: uuidv4,
    } = require('uuid');
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'public/upload')
        },
        filename: function(req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname)
        }
    });
    var upload = multer({
        storage: storage,
        fileFilter: function(req, file, cb) {
            console.log(file);
            if (file.mimetype == "image/bmp" ||
                file.mimetype == "image/png" ||
                file.mimetype == "image/gif" ||
                file.mimetype == "image/jpg" ||
                file.mimetype == "image/jpeg"

            ) {
                cb(null, true)
            } else {
                return cb(new Error('Only image are allowed!'))
            }
        }
    }).single("avatar");
    appParam.post("/uploadFile", function(req, res) {

        upload(req, res, function(err) {
            if (err instanceof multer.MulterError) {
                res.json({ result: 0, message: "A Multer error occurred when uploading." });
            } else if (err) {
                res.json({ result: 0, message: "An unknown error occurred when uploading." + err });
            } else {
                console.log(req.file);
                res.json({ result: 1, message: "Upload Successfully.", info: req.file });
            }

        });
    });

};