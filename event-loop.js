const fs=require('fs');


setTimeout(()=>console.log('timer 1 is finished'),0);
setImmediate(()=>{console.log('immediate 1 finished')})

fs.readFile("test-file.txt",()=>{
    console.log('i/o finished')

    setTimeout(() => console.log("Timer 2 finished"), 0);
    setTimeout(() => console.log("Timer 3 finished"), 3000);
    setImmediate(() => console.log("Immediate 2 finished"));
    
})

console.log('hello from top-level code')