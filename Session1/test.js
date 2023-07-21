// Topic:: There is an array = [1,2,3,4,5,6,7,8,9,10, "J", "Q", "K"], the players will choose randomly 3 cards which are different each other. With J, Q, and K value equal to 0. Total must be equal to 7.

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]
var player = [];
var count = 0;

function removeElement(a, element) {
    //console.log(`Start remove ${element} in ${a} ...`);
    var index = a.indexOf(element);
    if (index > -1) {
        a.splice(index, 1);
    }
    //console.log(`-- Remove ${element} in ${a} successfully.`);
}

function choosingCard(arrayCard) {
    // Using Math.floor(Math.random() *  Number) function to get randomly element in this array
    //console.log(`Starting choose card from ${arrayCard}`);
    var random = Math.floor(Math.random() * arrayCard.length);
    var cardRandom = arrayCard[random];
    //console.log(`With ${random} position, the value is ${arrayCard[random]}`);
    removeElement(arrayCard, arrayCard[random]);
    //console.log(`-- Choosing the card ${cardRandom} successfully.`);
    return cardRandom;
}

function getValueFromCard(card) {
    if (!isNaN(card))
        return card;
    else
        return 0;
}


function inputIntoArray(Element, Array) {
    //console.log(`Start input ${Element} into ${Array}`);
    Array.push(Element);
    //console.log(`-- Inputed ${Element} into the array ${Array} successfully.`);
    //console.log(Array);
    return Array;
}

try {
    for (var i = 1; i <= 13; i++) {
        //get the last card
        if (count === 2) {
            result = choosingCard(array);
            //this case was resolved
            if (result === "J" || result === "Q" || result === "K") {
                inputIntoArray(result, player);
                //console.log(`The player has third card with ${result[1]} value.`);
                //console.log(`The player have three cards: ${player}`);
                //console.log(`In order to choose three cards with total equal to 7. The server had worked ${result[3]} times.`);
                break;
            }
        } else if (count < 2) {
            result = choosingCard(array);
            if (result === "J" || result === "Q" || result === "K" || result <= 7) {
                //get the second card
                if (count === 1) {
                    //console.log(`The value of previous two cards: ${memory[0]} and ${result[1]}.`);
                    var twocardsvalue = getValueFromCard(player[0]) + getValueFromCard(result);
                    var thirdcardvalue = 7 - twocardsvalue;
                    if (thirdcardvalue >= 0) {
                        //console.log(`The value of thirdcard must be: ${thirdcardvalue}.`);
                        count++;
                        inputIntoArray(result, player);
                        if (thirdcardvalue > 0 && array.indexOf(thirdcardvalue) > -1) {
                            //if thirdcardvalue > 0, thirdcardvalue should be 1,2,3,4,5,6 so the third card should be 1,2,3,4,5,6
                            inputIntoArray(thirdcardvalue, player);
                            break;
                        }
                        //console.log(`The player has second card with ${memory[1]} value.`);
                    } else {
                        //console.log(`The server will choose again.`);
                    }
                } else if (count === 0) { //get the first card
                    count++;
                    inputIntoArray(result, player);
                    //console.log(`The player has first card with ${memory[0]} value.`);
                }
            } else if (result > 7) {
                //console.log(`The value of card ${result[1]} greater than 7. Server will choose again!!!`);
            }
        }
    }
    console.log(player);
} catch (errorMain) {
    //console.log(`Found the errors in this Script: ${errorMain}`);
}