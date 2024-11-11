const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})
const app=require('./app')





const uri = 'mongodb://localhost:27017/natours-test';
// const uri = mongoose.createConnection('mongodb://localhost:27017/natours-test');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB with Mongoose'))
    .catch(error => console.error('Error connecting to MongoDB:', error));






const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app running on port at ${port}....`);
});
