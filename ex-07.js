var number = 1;
setTimeout(() => {
    number = 2;
    console.log(number);
}, 3000);
console.log(number);