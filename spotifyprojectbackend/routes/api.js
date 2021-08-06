const express=require("express");
const router=express.Router();
const spotifyAPI= require("../utils/wrapper.js"); //importing the wrapper object

//scopes are listed as per requirement of the app. The format of each scope is provided by Spotify.
const scopes=['user-read-email','user-read-private','user-follow-read','user-top-read','user-read-recently-played'];
var state= "Per-sassy Jackson";


router.get("/",(request,response)=>{
    console.log("The server-side default code is working");
    response.status(200).end("At the default express backend endpoint");
})

router.get("/login",(request,response)=>{ //frontend calls this endpoint. This endpoint should use the spotify api wrapper to call the authorise endpoint
    
    console.log("Frontend made call to backend login endpoint");

    //console.log(spotifyAPI);
    
    var authoriseURL=spotifyAPI.createAuthorizeURL(scopes,state,true); //state is used kind of like a checksum to ensure no interception or something has taken place.
   
    console.log("Redirecting to spotify ")
    response.redirect(authoriseURL); //redirecting the user to the Spotify Accounts Authorize endpoint

    
    //After the user provides or declines permissions, they are redirected by Spotify back to the redirectURL provided.
})


router.get("/getAccessToken",(request,response)=>{ 

    //if user gives authorisation, a code is appended to the request as a query string.This code can be exchanged for access and refresh token, via calling another API endpoint
    console.log("In the access token endpoint");
    console.log("Getting an access token");

    if(request.query.error)
    {
        console.log(request.query.error);
        response.status(404).end("An error occurred");
    }
    var code=request.query.code;
    var queryState = request.query.state;


    //the code below is used to obtain an access token and a refresh token, from Spotify.
    spotifyAPI.authorizationCodeGrant(code).then( (data)=> {

         /* console.log('The token expires in ' + data.body['expires_in']);
          console.log('The access token is ' + data.body['access_token']);
          console.log('The refresh token is ' + data.body['refresh_token']);*/

          var expires_in=data.body['expires_in']*1000;

          console.log("Access Token expires in: ",expires_in);

          //store the access token in the cookie jar, and have every request to the server contain the access token.
           
          var expiresIn= new Date(((Date.now()+3600000)+expires_in)); //expires is in seconds, so convert to milliseconds
          console.log("Expires in ",expiresIn);

          response.cookie("accessToken",`${data.body['access_token']}`,{expires:expiresIn,path:"/",httpOnly:true});
          response.cookie("refreshToken",`${data.body["refresh_token"]}`,{})
         
         /* spotifyAPI.setAccessToken(data.body['access_token']);
          spotifyAPI.setRefreshToken(data.body['refresh_token']);*/
    
          response.status(200).json({expiresIn:expires_in});
        }).catch((error)=>{
            console.log(error.message);
            response.status(400).json({message:`${error.message}`});
        })
})


router.get("/logout",(request,response)=>{
    console.log("Cookies:",request.cookies);

    response.cookie("accessToken"," ",{expires:new Date((Date.now()-1000000)),httpOnly:true} ) //an attempt at replacing the accessToken cookie, with a blank one that has already expired.
    response.cookie("refreshToken"," ",{expires:new Date((Date.now()-1000000)),httpOnly:true})
    //response.json({message:"Successfully logged out, well we think you have "});
    console.log("Successfully logged out. well, we think you have ");
    response.redirect("http://localhost:3000/")
})

router.get("/refreshAccessToken",(request,response)=>{ 

    console.log("In the refreshAccessToken endpoint");

    console.log("Cookies",request.cookies);

    var refreshToken=request.cookies.refreshToken;

    spotifyAPI.setRefreshToken(refreshToken);
    spotifyAPI.refreshAccessToken().then((data)=> {
        console.log('The access token has been refreshed!');
    
        // Save the access token so that it's used in future calls
        //store the new access token in the cookie jar.
       // spotifyApi.setAccessToken(data.body['access_token']);
        var expiresIn=data.body["accessToken"];
        response.cookie("accessToken",`${data.body['access_token']}`,{expires:expiresIn,credentials:'same-origin',httpOnly:true});
        response.redirect("http://localhost:3000/profile");//redirecting to the profile page, after getting new Access and Refresh tokens
      }).catch((error)=> {
          console.log('Could not refresh access token', error);
          response.redirect("http://localhost:3000/");
        })

})


router.get("/profile",(request,response)=>{ //this endpoint is called by the client side

    //call API endpoint and return user profile data to frontend, displayed as a single card. 

    console.log("Cookies:",request.cookies);

    var accessToken= request.cookies.accessToken;

    //console.log("The access token is:", accessToken);

    spotifyAPI.setAccessToken(accessToken);

    if(spotifyAPI.getAccessToken()==undefined||spotifyAPI.getAccessToken()==null)// if access token does not exist
    {
        console.log("Not Authorised yet, User has to log in with Spotify.")
        console.log("Redirecting to Login endpoint");
        response.redirect("http://localhost:3001/logout");
    }
   
    else{
        spotifyAPI.getMe().then((data)=>{

            //console.log(data.body);

            response.json(data.body);//sending the data back to the client side
        }).catch((error)=>{
            console.log(error);
            console.log(error.body);
            response.status(400).json({message:error.message})
        })

    }
})

router.get("/getFavouriteArtists",(request,response)=>{
    console.log("Cookies",request.cookies);
    var accessToken=request.cookies.accessToken;
    spotifyAPI.setAccessToken(accessToken);

    spotifyAPI.getMyTopArtists({limit:5}).then((responseData)=>{
        var artistData=responseData.body.items; //getting the top artists, which are in an array of objects.

        var artistsArray=[];
        artistData.forEach((artist)=>{
            console.log(artist.name);
            var artistGenres="";
            //console.log("Genres of this artist: ",(artist.genres).length)
             if((artist.genres).length>1)
             {
                 var genres= artist.genres;
                 //console.log(genres);
                 genres.forEach((genre,index)=>{

                    if(index!=((artist.genres).length)-1)

                       artistGenres= artistGenres.concat(`${genre}, `);
                    else
                    artistGenres=artistGenres.concat(`${genre}`)
                 })
             }

             else
             artistGenres=artist.genres;

             //console.log("Genres:",artistGenres);

            var artistObject={
                name:artist.name,
                image:artist.images[2],
                followers:artist.followers.total,
                genres:artistGenres
            }

            artistsArray.push(artistObject);
        })

        response.status(200).json(artistsArray);
    }).catch((error)=>{
        console.log(error.message);
        response.status(400).json({message:error.message});
    })
})

router.get("/getFavouriteTracks", (request,response)=>{

    console.log("Cookies: ", request.cookies);

    spotifyAPI.setAccessToken(request.cookies.accessToken);

    var tracksArray=[];

    spotifyAPI.getMyTopTracks({limit:5}).then((responseData)=>{
        //console.log(responseData); //this would be an array of objects that represent the user's favourite tracks
        var tracksData=responseData.body.items;
        //console.log(tracksData);
        tracksData.forEach((track)=>{
            //console.log(track);
            var names="";
           // console.log(`Number of Artists on ${track.name}: ${track.artists.length}`)

            if( (track.artists).length>1){
                var artists=track.artists;

                artists.forEach((artist,index)=>{
                    console.log(artist.name);
                    if(index!=(track.artists.length)-1)
                    names=names.concat(` ${artist.name},`)
                    else 
                    names=names.concat(`${artist.name}`);
                })
                console.log("Artists in this track: ",names);
            }
            else{
                names=track.artists[0].name;
            }
            var trackObject={
                id:track.id,
                name:track.name,
                album:track.album.name,
                albumImage:track.album.images[0],
                artist:names,
                popularity:track.popularity,
                previewURL:track.preview_url,
            }

           // console.log(trackObject.artist);
            tracksArray.push(trackObject);
        })

        response.status(200).json(tracksArray);
    }).catch((error)=>{
        console.log(error.message);
        response.status(403).json({message:"Oops,that wasn't supposed to happen, but it did. Try the good o'l refreshing the page trick"})
    })
})


module.exports=router;