var jwt = require('jsonwebtoken');
const privateKey = "fsfsdfsfsdfewfwefwef#@$#%^%$^%$YG%$Y%G%GREGERGERG";
var secretData = {
    name: "The Vi Tran",
    courses: [{ name: "Android" }, { name: "Blockchain" }],
    // registerDate: Date.now()
};

jwt.sign(secretData, privateKey, function(err, token) {
    console.log(token);
});