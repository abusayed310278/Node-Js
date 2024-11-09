const EventEmitter = require("events");

const myEmitter=new EventEmitter()
myEmitter.on("newSale",()=>{
    console.log(`there are now items left in stock`)
})


myEmitter.emit("newSale");