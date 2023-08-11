var jwt = require('jsonwebtoken');
const privateKey = "fsfsdfsfsdfewfwefwef#@$#%^%$^%$YG%$Y%G%GREGERGERG";
var secretData = {
    name: "The Vi Tran",
    courses: [{ name: "Android" }, { name: "Blockchain" }],
    registerDate: Date.now()
};

jwt.sign(secretData, privateKey, { expiresIn: 60 * 60 }, function(err, token) {
    setTimeout(() => {
        console.log(token);
        jwt.verify(token, privateKey, function(err, decoded) {
            if (err) {
                console.log(err);
            } else {
                if (decoded == undefined) {
                    console.log("WRONG TOKEN");
                } else {
                    console.log(decoded);
                }
            }
        });
    }, 1);

});