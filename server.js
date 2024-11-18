const mongoose=require('mongoose')
const dotenv=require('dotenv')


process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({path:'./config.env'})
const app=require('./app')





const uri = 'mongodb://localhost:27017/natours-test';
// const uri = mongoose.createConnection('mongodb://localhost:27017/natours-test');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB with Mongoose'))
    .catch(error => console.error('Error connecting to MongoDB:', error));






const port = process.env.PORT || 3000;

const server=app.listen(port, () => {
  console.log(`app running on port at ${port}....`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});