require('dotenv').config();
const mongoose = require('mongoose');

url = process.env.DB_DATABASE
mongoose.connect(url).then(()=>{
    console.log('Successfully connected to Database')
}).catch((error)=>{
    console.log(error.message)
})