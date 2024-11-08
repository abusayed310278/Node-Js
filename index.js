const fs=require('fs');

/*
//Blocking,synchronous way
const input=fs.readFileSync('./input.txt','utf-8');
console.log(input);

const output=`this is input file: ${input}.\n created at ${Date.now()}`

fs.writeFileSync('output.txt',output);
*/

fs.readFile('input.txt','utf-8',(err,data)=>{
    console.log(data)
})

console.log('will read this file');