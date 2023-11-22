// hash: bcryptjs

var bcrypt = require('bcryptjs');
var count = 0;
while (count < 1) {
    bcrypt.genSalt(17, (err, salt) => {
        console.log(salt);
        bcrypt.hash("tranthevink", salt, (err, hash) => {
            console.log(hash);
            bcrypt.compare("tranthevink", hash, (err, success) => {
                console.log(success); //true
            });
        });
    });
    count++;
    console.log(count);
}