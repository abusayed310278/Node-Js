const fs=require('fs');

/*
//Blocking,synchronous way
const input=fs.readFileSync('./input.txt','utf-8');
console.log(input);

const output=`this is input file: ${input}.\n created at ${Date.now()}`

fs.writeFileSync('output.txt',output);
*/


//non-blocking,asynchronous way
fs.readFile('input.txt','utf-8',(err,data1)=>{
    
    if(err)return console.log('ERROR');

    fs.readFile(`${data1}.txt`,'utf-8',(err,data2)=>{
        console.log(data2);

        fs.readFile('append.txt','utf-8',(err,data3)=>{
            console.log(data3)
        })

    })


})

console.log('will read this file');