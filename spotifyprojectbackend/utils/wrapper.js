require("dotenv").config(); //getting environment variable from .env file using the dotenv package.
const spotifyAPIWrapper=require("spotify-web-api-node");

const CLIENTID=process.env.CLIENTID;
const CLIENTSECRET=process.env.CLIENTSECRET;

const spotifyAPI=new spotifyAPIWrapper({
  clientId:CLIENTID,
  clientSecret:CLIENTSECRET,
  redirectUri:"http://localhost:3000/profile"
});

module.exports=spotifyAPI;