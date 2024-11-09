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

const replaceTemplate=(temp,product)=>{

    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}


//express for router
const url=require('url');

const tempOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');


const data=fs.readFileSync(`${__dirname}/data.json`,'utf-8');
const dataObj=JSON.parse(data);

const server=http.createServer((req,res)=>{
    const pathName=req.url;

    if(pathName==='/' || pathName==='/overview'){
        res.writeHead(200,{
            'Content-type':'text/html'
        })

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

    }else if(pathName==='/product'){
        res.end('product');
    }else if(pathName==='/api'){

        res.writeHead(200,{
            'Content-type':'application/json'
        });
        res.end(data);
        // res.end(dataObj);

    }else{
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
 