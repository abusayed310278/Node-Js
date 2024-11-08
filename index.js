const fs=require('fs');


//Blocking,synchronous way
const input=fs.readFileSync('./input.txt','utf-8');
console.log(input);

const output=`this is input file: ${input}.\n created at ${Date.now()}`

fs.writeFileSync('output.txt',output);


