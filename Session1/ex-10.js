Counting(5, 0, "An com");

//0 An com
//1 An com
//2 An com
//3 An com
//4 An com

function Counting(max, start, action) {
    // if (max > start) {
    //     console.log(start + " - " + action);
    //     Counting(max, start + 1, action);
    // }
    setTimeout(() => {
        if (max > start) {
            console.log(start + " - " + action);
            Counting(max, start + 1, action);
        }
    }, 1000);
}