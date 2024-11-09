const fs=require('fs');
const crypto=require('crypto')
const start=Date.now()

process.env.UV_THREADPOOL_SIZE=2

setTimeout(()=>console.log('timer 1 is finished'),0);
setImmediate(()=>{console.log('immediate 1 finished')})

fs.readFile("test-file.txt",()=>{
    console.log('-------i/o finished----------')

    setTimeout(() => console.log("Timer 2 finished"), 0);
    setTimeout(() => console.log("Timer 3 finished"), 3000);
    setImmediate(() => console.log("Immediate 2 finished"));

    process.nextTick(() => console.log("Process.nextTick"));

    crypto.pbkdf2('password','sald',100000,1024,'sha512',()=>{
        console.log(Date.now()-start,'password encrypted')
    });

    crypto.pbkdf2('password','sald',100000,1024,'sha512',()=>{
        console.log(Date.now()-start,'password encrypted')
    });

    crypto.pbkdf2('password','sald',100000,1024,'sha512',()=>{
        console.log(Date.now()-start,'password encrypted')
    });

    crypto.pbkdf2('password','sald',100000,1024,'sha512',()=>{
        console.log(Date.now()-start,'password encrypted')
    });

})

console.log('hello from top-level code')