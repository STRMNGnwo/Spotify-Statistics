const express=require("express");
//const spotifyWrapper= require('spotify-web-api-node');
const router=require("./routes/api.js");
const cookieParser=require("cookie-parser"); 
const cors=require("cors");

const app=express();

app.use(cors({origin:"http://localhost:3000",credentials:true}));
app.use(cookieParser());//parses the Cookie header in incoming requests and makes info available as req.cookies.


//routes
//basically hostingURL/something will be handler by the router
app.use("",router);


module.exports=app;