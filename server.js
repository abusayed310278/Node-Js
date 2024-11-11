const mongoose=require('mongoose')
const dotenv=require('dotenv')
const app=require('./app')

// console.log(app.get('env'))
// console.log(process.env)

dotenv.config({path:'./config.env'})
// mongoose.connect();

const tourSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,'A tour must have a name'],
    unique:true
  },
  rating:{
    type:Number,
    default:4.5,
  },
  price:{
    type:Number,
    required:[true,'A tour must have a price']
  },
});

//here Tour is model madel name so its named as Tour which is convention of node.js
const Tour=mongoose.model('Tour',tourSchema);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app running on port at ${port}....`);
});
