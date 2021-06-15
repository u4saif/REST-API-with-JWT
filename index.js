const express = require("express");
const mongoose = require("mongoose");
const bodyParser= require("body-parser");
const app = express();
const port= process.env.PORT || 3000;
const jwt=require("jsonwebtoken");
const cors = require('cors')

//Fix for cors error on post
app.use(cors())

// Fix the CORS Error 
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//Using bodyParser MiddleWare to parse the req to json
app.use(bodyParser.json());

//accessing the env variables
require("dotenv/config");

//JWT to verify authentic user access
app.use(checkTokenExist,(req, res, next) => { 
  jwt.verify(req.token,process.env.secrateKey, async (err,auth)=>{
      if(err){
          res.status(403).send("Forbidden inValid token");
      }else{
          next();

      }
  })
});

//Import  Routes 
const postRoute= require("./routes/post");
const delteRoute= require("./routes/delete");
app.use('/api/post',postRoute);
app.use('/api/delete',delteRoute);
//Routes in the server
app.get("/", (req, res) => {
  res.send("The project is running ....");
});

//connect to db
mongoose.connect(
   process.env.authKey,
  { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.warn("Connected to DB.");
});


function checkTokenExist(req,res,next){
  const bearHeader=req.headers["authorization"]
  if(typeof bearHeader !='undefined'){
      const bearer=bearHeader.split(" ");
      const bearerToken=bearer[1];
      req.token=bearerToken;
      next();
  }else{
      res.status(403).send("Forbidden");
  }
}

//Start the app at port 3000
app.listen(port, () => {
  console.log("App is running at port ..",port);
});
 