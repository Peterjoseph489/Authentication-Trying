require('./config/configDB')
const route = require('./routes/userRoute')
const express = require('express');
PORT = process.env.PORT || 3331

const app = express();


app.use(express.json());
app.use('/api', route)

app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`)
});