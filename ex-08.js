var test;
var theNumber3 = function() {
    return new Promise((resolve, reject) => {
        test = setTimeout(() => {
            reject("reject");
        }, 3000);
    });
}

theNumber3().then((x) => {
    console.log(x + "hehe");
}).catch((x) => {
    console.log(x);
});

// var test = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log("he");
//     }, 3000);
//     reject(50);
// }).then((x) => { console.log(x) }).catch((x) => { console.log(x) });