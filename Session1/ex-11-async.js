var arrayJob = [
    { job: "Sleeping", duration: 5 },
    { job: "Working", duration: 3 },
    { job: "Playing", duration: 6 },
    { job: "Relaxing", duration: 1 },
    { job: "Reading", duration: 2 }
]

myFunction();
async function myFunction() {
    for (var i = 0; i < arrayJob.length; i++) {
        //waiting until this work done
        await Counting(arrayJob[i].duration, 0, arrayJob[i].job);
    }
    console.log("What a day!");
}

function Counting(max, start, action) {
    return new Promise(resolve => {
        setTimeout(() => {
            if (max > start) {
                console.log(action + " " + start);
                //exit the first Counting with recursive call
                resolve(Counting(max, start + 1, action));
            } else {
                //exit last Counting 
                resolve();
            }
        }, 1000);
    });
}

//Sleeping 0
//Sleeping 1
//..
//Sleeping 4
//Working 0
//Working 1
//Working 2
//..
//Reading 0
//..
//Reading 1
//What a day!

// myTest();
// async function myTest() {
//     var test = await new Promise((resolve) => {
//         setTimeout(() => {}, 2000);
//     });
//     console.log(test);
//     console.log("here");
// }