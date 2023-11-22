var myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
var indexGot = [];
// node ex-04.js
// Your cards are:  3, "Q", 4 // random KHONG DUOC TRUNG
// Your total is: 7
var randomIndex1 = randomIndex();
var randomIndex2 = randomIndex();
var randomIndex3 = randomIndex();
console.log(`Your cards are: ${myArray[randomIndex1]}, ${myArray[randomIndex2]}, ${myArray[randomIndex3]}`);
console.log(`Your total is: ${getValue(myArray[randomIndex1]) + getValue(myArray[randomIndex2]) + getValue(myArray[randomIndex3])}`);

function randomIndex() {
    var continueRandom = true;
    while (continueRandom) {
        var randomIndex = Math.floor(Math.random() * myArray.length);
        if (indexGot.includes(randomIndex))
            continueRandom = true;
        else
            continueRandom = false;
    }
    indexGot.push(randomIndex);
    return randomIndex;
}

function getValue(a) {
    if (isNaN(a))
        return 0;
    else
        return a;
}