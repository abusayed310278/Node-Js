const EventEmitter = require("events");


class Sales extends EventEmitter {
    constructor() {
      super();
    }
  }

const myEmitter=new Sales()
myEmitter.on("newSale",()=>{
    console.log(`there are now items left in stock`)
})

myEmitter.on("newSale",stock=>{
    console.log(`there are now ${stock} items left in stock`)
})


myEmitter.emit("newSale",9);