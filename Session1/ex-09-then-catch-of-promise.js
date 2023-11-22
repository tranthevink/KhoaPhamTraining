var theNumber3 = function(yearOfBirth) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let currentYear = new Date().getFullYear();
            var age = currentYear - yearOfBirth;
            if (currentYear - yearOfBirth >= 18)
                resolve(age);
            else
                reject(age);
        }, 3000);
    });
}

theNumber3(1997).then((data) => {
    console.log("Welcome to the movie " + data);
}).catch((err) => {
    console.log("Sorry, you are too young!! " + err);
});