const axios = require("axios");


var loginWebzen = (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post("/https://login.webzen.com", {
                ReturnUrl: '',
                UserID: 'lolipop2018x',
                Password: "1245343434",
                IsNewsLetter: false
            })
            .then((res) => {
                if (res.data.includes("We couldn't match the entered username or password to a webzen.com account."))
                    resolve("failed");
                else {
                    resolve("Successfully");
                }
            })

        .catch((err) => {
            reject(err);
        })
    })
};