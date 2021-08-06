import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {Typography,Grid} from "@material-ui/core"
import Header from "./Header"
import ProfileCardComponent from "./ProfileCardComponent"
import Favourites from "./Favourites.js"
import List from "./List"
import Footer from "./Footer"
import axios from "axios"

//this is the Profile page, where the SPOTIFY API redirects to after User authentication is either approved or denied.
const Profile=(props)=>{

    const[currentDarkMode, setDarkMode]=useState(false);
    //const [loggedIn,setLoggedIn]=useState(false);
    const [profileDetails,setProfileDetails]=useState(null);
    const [favouriteArtists,setFavouriteArtists]=useState(null);
    const [favouriteTracks,setFavouriteTracks]=useState(null);
    var history=useHistory();
    var loggedIn;

    const buttonLink="http://localhost:3001/logout";
    var profileData;

     console.log(currentDarkMode);

      var pageStyle= currentDarkMode?{backgroundColor:"black",color:"white"}:{backgroundColor:"white",color:"black"};
      var appbarStyle=currentDarkMode?{background:"green",color:"black",border:"solid",borderColor:"black"}:{background:"black",color:"white"};
  
     const changeBackgroundColour=()=>{
     pageStyle=currentDarkMode?{ backgroundColor:"white",color:"black" }: {  backgroundColor:"black",color:"white" }
     document.body.style.backgroundColor=pageStyle.backgroundColor; //probably bad practice, but only way to ensure the entire page colour changes.
    setDarkMode(!currentDarkMode); //changing the state, thus triggering a re-render of the component.
  }
     //React Router passes in stuff like query string parameters as a property of location props object 
     console.log(props.location) 

     //the below code is used to get the code value from the queryString which was sent as a response from Spotify API.
     const queryString=props.location.search;
     const params=new URLSearchParams(queryString); 
     const code=params.get("code");

     console.log("The authorization code is:", code); //getting the authorization code value
    

    useEffect(()=>{ //on initial render a call must be made to the /getAccessToken endpoint.
        //an access token and a refresh token are returned by the getAccessToken endpoint, if code is valid.
        if(code===undefined||code===null)
        {
            console.log("You seem to have not given permissions.....Redirecting back to home page");
            history.push("/")
        }
        
        //making a call to the getAccessToken endpoint, to get the access and refresh tokens

        axios.get("http://localhost:3001/getAccessToken"+`?code=${code}`,{withCredentials:true}).then((response)=>{

                    console.log(response);
                    var expiresIn=response.data.expiresIn;
            
                    console.log("Access Token expires in: ", expiresIn)
            
                    setInterval(()=>{ //refreshing the access token, when it expires.
            
                        axios.get("http://localhost:3001/refreshAccessToken",{withCredentials:true}).then((response)=>{
            
                        console.log("Hopefully the access token has been refreshed");
                        }).catch((error)=>{
                            console.log("An error occurred and the access token could not be refreshed :(");
                            history.push("/");
                        })
                                               
                    },expiresIn) //end of setInterval
            
                    axios.get("http://localhost:3001/profile",{withCredentials:true}).then((response)=>{
                                 
                             console.log("Profile",response);
                             profileData=response.data; 
                             console.log(profileData);
                            //loggedIn=true;
                            console.log("Logged in: ",loggedIn);
                            setProfileDetails(profileData); 
            
                    }).catch((error)=>{
                        console.log(error);
                        console.log("Unable to obtain profile data")
                    })
                                
                                //setLoggedIn(true);
                    }).catch((error)=>{
                        console.log("Error while getting access and refresh tokens. Redirecting back to homepage");
                        console.log(error.message)
                        history.push("/");
                    })
            
        //setLoggedIn(true);
        
    },[]) //this useEffect hook is only executed once, when the Profile component is initially rendered.
   const getFavouriteArtists=()=>{  //get favourite artists

    axios.get("http://localhost:3001/getFavouriteArtists",{withCredentials:true}).then((response)=>{
    //response would be an array of objects, loop through the array and display a list component for each object
    const responseData=response.data;
    console.log(response.data);
   const artists=responseData.map((artist)=><List type="Artist" key={artist.name} name={artist.name} artistImage={artist.image} followers={artist.followers} genres={artist.genres} />)
      //const artists="your favourite artists here!";
      console.log("Finished making the list")
      setFavouriteArtists(artists); 
    })
   }

   const getFavouriteTracks=()=>{
    axios.get("http://localhost:3001/getFavouriteTracks",{withCredentials:true}).then((response)=>{
        console.log(response.data);//should be automatically parsed JSON data.

        const tracksData=response.data;
        console.log("Favourite tracks", tracksData);
        const tracks=tracksData.map((track)=><List type="Track"key={track.id} name={track.name} album={track.album} artist={track.artist} albumImage={track.albumImage} previewURL={track.previewURL} />)
        console.log("Finished making the list");
        setFavouriteTracks(tracks);
        })
     }
   
    if(profileDetails) //if logged in and profile details have been obtained.
    {
        return(
            <>
            <Header style={appbarStyle} changeColour={changeBackgroundColour} darkMode={currentDarkMode} link={buttonLink} linkText="Logout"/>
            <Grid container spacing={1}>

                <Grid item xs={12} md={12} >
                <ProfileCardComponent content={profileDetails}/>
                </Grid>

                <Grid item xs={12} md={12} >
                <Favourites style={appbarStyle}text="Your Favourite Artists" onClickFunction={getFavouriteArtists} content={favouriteArtists} />
                </Grid>
               
                <Grid item xs={12} md={12}>
                <Favourites style={appbarStyle}text="Your Favourite Tracks" onClickFunction={getFavouriteTracks} content={favouriteTracks} />
                </Grid>

                <Grid item xs={12} md={12} >
                    <div style={{paddingTop:30}}>
                    <Footer style={appbarStyle}/> 
                    </div>
                </Grid>

            </Grid>
            </>
        )
    }
    
    else{ //show a loading screen
        return(
            <>
           
            </>
        )
    }
}

export default Profile;