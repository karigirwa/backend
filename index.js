const express = require("express");
const app = express();
const mongoose = require("mongoose");



// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/updates",{useNewUrlParser: true }).then(() =>{

app.use(express.json());

const blogger = require("./controller/blogs");

app.use("/",blogger);  

    app.listen(9000, ( ) => {
        console.log("<< localhost:9000>>");
    }); 
}).catch(()=>{
    console.log('connection has failed')
});