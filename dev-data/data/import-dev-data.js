const mongoose=require('mongoose')
const dotenv=require('dotenv')
const fs=require('fs')

const Tour=require('./../../models/tourModel')

dotenv.config({path:'./config.env'})



const uri = 'mongodb://localhost:27017/natours-test';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB with Mongoose'))
    .catch(error => console.error('Error connecting to MongoDB:', error));


//read json file
const tours=JSON.parse(
    fs.readFileSync(`${__dirname}/tours.json`,'utf-8')
)

//import data
const importData=async ()=>{
    try{
        await Tour.create(tours);
        console.log('data successfully loaded')
    }catch (err){
        console.log(err)
    }
    process.exit()
}

//delete all data
const deleteData=async ()=>{
    try{
        await Tour.deleteMany();
        console.log('data successfully deleted')
    }catch (err){
        console.log(err)
    }
    process.exit()
}

if(process.argv[2]==='--import'){
    importData();
}
if(process.argv[2]==='--delete'){
    deleteData();
}