const fs=require('fs');
const http=require('http');

/*
//Blocking,synchronous way
const input=fs.readFileSync('./input.txt','utf-8');
console.log(input);

const output=`this is input file: ${input}.\n created at ${Date.now()}`

fs.writeFileSync('output.txt',output);
*/


/*
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
*/


/*
//create server
const server=http.createServer((req,res)=>{
    res.end('hello form the server');
});


server.listen(8000,'127.0.0.1',()=>{
    console.log('listen to requests on port 8000');
});
*/


//express for router
const url=require('url');

const server=http.createServer((req,res)=>{
    const pathName=req.url;

    if(pathName==='/' || pathName==='/overview'){
        res.end('overview')

    }else if(pathName==='/product'){
        res.end('product');
    }else if(pathName==='/api'){

        fs.readFile(`${__dirname}/data.json`,'utf-8',(err,data)=>{

            const productData=JSON.parse(data);
            res.writeHead(200,{
                'Content-type':'application/json'
            })
            res.end(data);
        })

    }
    else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header':'hello world'
        });

        res.end('<h1>page not found</h1>');
    }
    
});


server.listen(8000,'127.0.0.1',()=>{
    console.log('listen to requests on port 8000');
});
 