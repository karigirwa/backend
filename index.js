const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser")
const cors = require("cors");

const userRoutes = require('./signin/routes/user');
const blogger = require("./controller/blogs");
//connect("mongodb://localhost:27017/updates", { useNewUrlParser: true })
mongoose
.connect("mongodb+srv://Happy:RA2WH9nFd5erM52@datastore.jdhkk.mongodb.net/Store?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>{   
    console.log('database connected')
}).catch(()=>{
    console.log('connection has failed')
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to My Blog Backend. "});
});
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}....`);
});

// Connect to MongoDB database
//"mongodb://localhost:27017/updates"
//mongodb+srv://Happy:<password>@datastore.jdhkk.mongodb.net/<dbname>?retryWrites=true&w=majority
