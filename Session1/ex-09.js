var theNumber3 = function(yearOfBirth) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var age = 2023 - yearOfBirth;
            if (2023 - yearOfBirth >= 18)
                resolve(age);
            else
                reject(age);
        }, 3000);
    });
}

theNumber3(2020).then((data) => {
    console.log("Welcome to the movie " + data);
}).catch((err) => {
    console.log("Sorry, you are too young!! " + err);
});