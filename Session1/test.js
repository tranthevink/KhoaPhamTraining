let jobs = [
    { job: "Sleeping", duration: 5 },
    { job: "Working", duration: 3 },
    { job: "Playing", duration: 6 },
    { job: "Relaxing", duration: 1 },
    { job: "Reading", duration: 2 }
  ];
  let readingJob = function(jobs, index = 0, durationStart = 1) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let job = jobs[index];
        if (durationStart <= job.duration){
          console.log(job.job + ' ' + durationStart);
          resolve(readingJob(jobs, index, durationStart+1));
        } else if (jobs.length !== index + 1){
          resolve(readingJob(jobs, index+1));
        } else {
          resolve();
        }
      }, 1000);
    });
  }
  
  readingJob(jobs).then(() => {
    console.log("What a day! " );
  })