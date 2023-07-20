// Topic:: There is an array = [1,2,3,4,5,6,7,8,9,10, "J", "Q", "K"], the players will choose randomly 3 cards which are different each other. With J, Q, and K value equal to 0. Total must be equal to 7.

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]
var player = [];
var memory = [];
var count = 0;

function removeElement(a, element) {
    ////console.log(`Start remove ${element} in ${a} ...`);
    var index = a.indexOf(element);
    if (index > -1) {
        a.splice(index, 1);
    }
    // //console.log(`-- Remove ${element} in ${a} successfully.`);
}

function chooseElement(Value, Array) {
    ////console.log(`Start choose the ${Value} from ${Array}`);
    Elementresult = Array.find((element) => element === Value)
        // //console.log(`-- Found the ${Value} from ${Array}`);
    return Elementresult;
}

function choosingCard(arrayCard) {
    // Using Math.floor(Math.random() *  Number) function to get randomly element in this array
    ////console.log(`Starting choose card from ${arrayCard}`);
    var random = Math.floor(Math.random() * arrayCard.length);
    var cardRandom = arrayCard[random];
    ////console.log(`With ${random} position, the value is ${arrayCard[random]}`);
    removeElement(arrayCard, arrayCard[random]);
    ////console.log(`-- Choosing the card ${cardRandom} successfully.`);
    return [random, cardRandom, arrayCard];
}

function inputintoArray(Element, Array) {
    //console.log(`Start input ${Element} into ${Array}`);
    Array.push(Element);
    //console.log(`-- Inputed ${Element} into the array ${Array} successfully.`);
    //console.log(Array);
    return Array;
}

try {
    for (var i = 1; i <= 13; i++) {
        if (count == 2) {
            result = choosingCard(array);
            inputintoArray(i, result);
            if (memory[2] == 0) {
                if (result[1] == "J" || result[1] == "Q" || result[1] == "K") {
                    inputintoArray(0, memory);
                    inputintoArray(result[1], player);
                    //console.log(`The player has third card with ${result[1]} value.`);
                    //console.log(`The player have three cards: ${player}`);
                    //console.log(`In order to choose three cards with total equal to 7. The server had worked ${result[3]} times.`);
                    i = 13;
                }
            } else {
                var lastcard = chooseElement(memory[2], result[2]);
                inputintoArray(lastcard, player);
                //console.log(`The player has third card with ${lastcard} value.`);
                //console.log(`The player has three cards: ${player}.`);
                //console.log(`In order to choose three cards with total equal to 7. The server had worked ${result[3]} times.`);
                i = 13;
            }
        }
        if (count < 2) {
            result = choosingCard(array);
            inputintoArray(i, result);
            if (result[1] == "J" || result[1] == "Q" || result[1] == "K") {
                if (count == 1) {
                    inputintoArray(0, memory);
                    inputintoArray(result[1], player);
                    //console.log(`The player has second card ${result[1]} value.`);
                    //console.log(`The value of previous two cards: ${memory[0]} and ${memory[1]}.`);
                    var twocardsvalue = memory[0] + memory[1];
                    var thirdcardvalue = 7 - twocardsvalue;
                    if (thirdcardvalue >= 0) {
                        //console.log(`The value of thirdcard must be: ${thirdcardvalue}.`);
                        inputintoArray(thirdcardvalue, memory);
                        count = count + 1;
                    }
                }
                if (count == 0) {
                    count = count + 1;
                    inputintoArray(0, memory);
                    inputintoArray(result[1], player);
                    //console.log(`The player has first card ${result[1]} value.`);
                }
            }
            if (result[1] <= 7) {
                if (count == 1) {
                    //console.log(`The value of previous two cards: ${memory[0]} and ${result[1]}.`);
                    var twocardsvalue = memory[0] + result[1];
                    var thirdcardvalue = 7 - twocardsvalue;
                    if (thirdcardvalue >= 0) {
                        //console.log(`The value of thirdcard must be: ${thirdcardvalue}.`);
                        inputintoArray(result[1], memory);
                        inputintoArray(thirdcardvalue, memory);
                        count = count + 1;
                        inputintoArray(memory[1], player);
                        //console.log(`The player has second card with ${memory[1]} value.`);
                    } else {
                        //console.log(`The server will choose again.`);
                    }
                }
                if (count == 0) {
                    inputintoArray(result[1], memory);
                    count = count + 1;
                    inputintoArray(memory[0], player);
                    //console.log(`The player has first card with ${memory[0]} value.`);
                }
            }
            if (result[1] > 7) {
                //console.log(`The value of card ${result[1]} greater than 7. Server will choose again!!!`);
            }
        }
    }
} catch (errorMain) {
    //console.log(`Found the errors in this Script: ${errorMain}`);
}