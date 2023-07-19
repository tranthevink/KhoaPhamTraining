function sayHi() {
    console.log("Say Hi");
}

function sum(a, b) {
    return a + b;
}

function divide(a, b) {
    if (!isNaN(a) && !isNaN(b)) {
        return a / b;
    } else {
        console.log("Wrong parameters")
    }
}


// sayHi();//Say Hi
var total = sum(3, 4);
// var divide = divide(9, 2); //throw exception because name of variable "divide" is the same as the name of function "divide" declared
var divide1 = divide(9, 2);
var divide2 = divide(9, "a"); //Wrong parameters
//console.log(total); //7
console.log(divide1); //4.5
console.log(divide2); //undefined