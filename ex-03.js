// hash: bcryptjs

var bcrypt = require('bcryptjs');

bcrypt.genSalt(10, function(err, salt) { //the number of 10 or 15 shows the difficulty of 
    bcrypt.hash("KhoaPham123456", salt, function(err, hash) {
        console.log(hash);
        //$2a$10$RvaxiX5t12exIzF0wPKj2.TZCSylhUoPG.6ItQwVXYsnpbWs7ttu2  //10
        //$2a$10$wOK8cxt2//k12b3iOh2ZEO8LchV50Rab6oWu6Z.oo5mxrp1C5Enk2 //10
        //$2a$10$SqqqdAlZ8FEikzEKdaCPVuUWgUDcF3EGTYHeklPRSng.sJkD.uYwe //10
        //$2a$15$9lvWDyUOel/6isO7ENTbVOdevrlgIjo1nk98QyIFKfP6TuP.VrPs6 //15
    });
});

// bcrypt.compare("adfdfsfsfs", "$2a$10$RvaxiX5t12exIzF0wPKj2.TZCSylhUoPG.6ItQwVXYsnpbWs7ttu2", function(err, res) {
//     // res === true
//     if (res === true) {
//         console.log("Login is successully");
//     } else {
//         console.log("Login failed");
//     }
// });