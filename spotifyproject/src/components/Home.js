import React from 'react'
import {useState} from 'react'
import {Grid,Card,CardActionArea,CardMedia,CardContent,Typography} from '@material-ui/core'
import Header from "./Header.js"
import Footer from "./Footer.js"
import LandingSectionImage2 from "../LandingSectionImage2.jpeg"
import CardImage1 from "../CardImage1.jpeg"
import CardImage2 from "../CardImage2.jpeg"
import CardImage3 from "../CardImage3.jpeg"

const Home=(props)=>{

  const[currentDarkMode, setDarkMode]=useState(false);

  const buttonLink="http://localhost:3001/login"
  console.log(currentDarkMode);

  var pageStyle= currentDarkMode?{backgroundColor:"black",color:"white"}:{backgroundColor:"white",color:"black"};
  var appbarStyle=currentDarkMode?{background:"green",color:"black",border:"solid",borderColor:"black"}:{background:"black",color:"white"};
  
     const changeBackgroundColour=()=>{
      
     pageStyle=currentDarkMode?{ backgroundColor:"white",color:"black" }: {  backgroundColor:"black",color:"white" }

     document.body.style.backgroundColor=pageStyle.backgroundColor; //probably bad practice, but only way to ensure the entire page colour changes.
    setDarkMode(!currentDarkMode); //changing the state, thus triggering a re-render of the component.
  }

  const style={
    backgroundColor:pageStyle.backgroundColor,
    color:pageStyle.color
  }

  const landingSectionStyle={
    backgroundImage:`url(${LandingSectionImage2})`, //url() is used here, as this bit of JSX is very similar to CSS rules. Normally(in html)just specifying the path as a string is enough.
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover", 
    backgroundAttachment:"fixed",
    paddingTop:150,
    paddingBottom:150,//padding to make the image cover a lot of space.
    height:500
  }
  
  const aboutSectionStyle={

    paddingTop:10,
    paddingBottom:10,
    height:500
  }

  return(
    <div style={style}>
      <Header style={appbarStyle} changeColour={changeBackgroundColour} darkMode={currentDarkMode} link={buttonLink} linkText="Login"/>
     
     <Grid container direction="row" justify="space-evenly" align="center"> 
      
      {/*The Landing Page*/ }
     <Grid item xs={12} >
         <div style={landingSectionStyle}> 

         <Typography style={{paddingTop:100,fontSize:50,color:"white",opacity:7 }} variant="h6">Welcome to Spotify-Stats!</Typography>

         </div>
     </Grid>
     
     {/*The About Section*/}


     <Grid item xs={12} md={12} lg={12} xl={12} >  
     
     <Typography style={{paddingTop:60}} variant="h4" >FEATURES </Typography>
     <Typography style={{paddingBottom:30}}variant="subtitle1">(not the music term, unfortunately) </Typography>
 
      </Grid>
  
     <Grid item xs={12} md={12} lg={4} xl={4}  >  

     <div style={aboutSectionStyle}>
       
     <Card variant="outlined">
         <CardActionArea>
         <CardMedia style={{height:300}}component="img" alt="Headphones" image={`${CardImage1}`} />
         <CardContent>See Interesting Statistics from Spotify Usage</CardContent>
         </CardActionArea>
     </Card>

     </div>

     </Grid>

     <Grid item  xs={12} md={12} lg={4} xl={4}> 

     <div style={aboutSectionStyle}>
     <Card variant="outlined">
         <CardActionArea>
         <CardMedia style={{height:300}} component="img" alt="Headphones" image={`${CardImage2}`} />
         <CardContent>Get your Top Artists, Albums, Tracks and more!</CardContent>
         </CardActionArea>
     </Card>
     </div>


     </Grid>

      <Grid item  xs={12} md={12} lg={4} xl={4}> 

      <div style={aboutSectionStyle}>
     <Card variant="outlined">
         <CardActionArea>
         <CardMedia style={{height:300}}component="img" alt="Headphones" image={`${CardImage3}`} />
         <CardContent>Learn how you listen, using Spotify-Stats</CardContent>
         </CardActionArea>
     </Card>
     </div>
     </Grid>
     
     <Grid item  xs={12} md={12} lg={12} xl={12}> 
     <Footer style={appbarStyle}/>
     </Grid>

     </Grid>


    </div>

)
}

export default Home;