import React from 'react'
import {Typography,makeStyles} from "@material-ui/core"

var audio=new Audio(); //global audio variable
var coloursArray=["mediumspringgreen","coral","thistle"]

const TracksModal=(props)=>{

    const classes=useStyles();
    const imageStyle={ //size of the artist image to be displayed.
        height:200,
        width:200,
        paddingLeft:100, //positioning the image in the center of the modal
        paddingRight:100
    }

    var playInstruction= props.previewURL!=null ? "Click the image to Play/Pause a 30 second preview":"This track does not have a preview snippet";
    var playAndPause=0; //variable to keep track of playing and pausing status for each modal.Works by counting clicks

    console.log("Props in the ModalBody are: ", props);
  
    const audioFunction=(source)=>{

        audio.src=`${source}`; 
        playAndPause+=1;
        console.log("In the audio Function");
        console.log("Value of playAndPause is ",playAndPause);
        
        if(playAndPause%2!=0) //if clicks are not divisible by 2 then play(assuming every other click is to pause )
        {
            audio.play();
        }
        else {
            audio.pause();
        }
    }
    return(
        <div style={ getModalStyle() } className={classes.paper}> 
        <img style={imageStyle} src={props.image} onClick={()=>audioFunction(props.previewURL)}></img> 
        <Typography style={{textAlign:"center"} } color="textPrimary" variant="subtitle1">{playInstruction} </Typography> 

         <Typography style={{textAlign:"center"} } color="textPrimary" variant="h6">Track:{props.name} </Typography>  
         <Typography style={{textAlign:"center"} } color="textPrimary" variant="h6">Album:{props.album} </Typography> 
         <Typography style={{textAlign:"center"} } color="textPrimary" variant="h6">Artist:{props.artist} </Typography> 
           
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
      //backgroundColor:theme.palette.background.paper,
      backgroundColor:`${coloursArray[Math.floor((Math.random()*2))]}`,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default TracksModal