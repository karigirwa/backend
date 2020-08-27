const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser")
const cors = require("cors");
app.use(express.json());
const userRoutes = require('./signin/routes/user');
const blogger = require("./controller/blogs");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});



app.use("/",blogger);  


app.use("/user",userRoutes);

    app.listen(3000, ( ) => {
        console.log("<< localhost:3000>>");
    });


// Connect to MongoDB database

mongoose.connect("mongodb://localhost:27017/updates",{useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>{   
}).catch(()=>{
    console.log('connection has failed')
});