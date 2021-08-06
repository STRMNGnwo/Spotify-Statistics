 import React from 'react'
 import {Typography,makeStyles} from "@material-ui/core"

var coloursArray=["mediumspringgreen","coral","thistle"]

const ArtistModal=(props)=>{

    const classes=useStyles();
    
    const imageStyle={ //size of the artist image to be displayed.
         
        borderRadius:`${50}%`,
        paddingLeft:120,
        paddingRight:120
    }

    console.log("Props in the ModalBody are: ", props);

    return(
        <div style={ getModalStyle() } className={classes.paper}> 
        <img style={imageStyle} src={props.image} alt="Artist Head in a frame from Spotify"></img> 
         <Typography style={{textAlign:"center"} } color="textPrimary" variant="h6">Name:{props.name} </Typography>   
         <Typography style={{textAlign:"center"} } color="textPrimary" variant="h6">Followers:{props.followers} </Typography>     
         <Typography style={{textAlign:"center"} } color="textPrimary" variant="h6">Genres:{props.genres} </Typography>      
         </div>
    )

}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const getModalStyle=()=>{
  //maybe remove the rand as it moves the model off centre sometimes
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const useStyles = makeStyles((theme) => ({ //overriding the CSS for the paper class using the makeStyles hook
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor:`${coloursArray[Math.floor((Math.random()*2))]}`,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default ArtistModal

/* function getModalStyle() {
    //maybe remove the rand as it moves the model off centre sometimes
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    }
  } */