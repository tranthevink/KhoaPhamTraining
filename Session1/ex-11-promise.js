var arrayJob = [
    { job: "Sleeping", duration: 5 },
    { job: "Working", duration: 3 },
    { job: "Playing", duration: 6 },
    { job: "Relaxing", duration: 1 },
    { job: "Reading", duration: 2 }
]

browseArray(0);

function browseArray(startIndex) {
    return new Promise(resolveLevel1 => {
        if (startIndex > arrayJob.length - 1)
            resolveLevel1();
        else {
            new Promise(resolveLevel2 => {
                resolveLevel2(recursiveCounting(arrayJob[startIndex].duration, 0, arrayJob[startIndex].job));
            }).then(() => {
                resolveLevel1(browseArray(startIndex + 1));
            });
        }
    });
}


function recursiveCounting(max, start, action) {
    return new Promise(resolve => {
        if (max > start) {
            setTimeout(() => {
                console.log(action + " " + start);
                resolve(recursiveCounting(max, start + 1, action));
            }, 1000);
        } else {
            resolve();
        }

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