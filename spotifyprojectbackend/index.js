const app=require("./app.js");
var http=require("http");

var server= http.createServer(app);
var PORT=3001;
server.listen(PORT,()=>console.log("Server running on port",PORT));

