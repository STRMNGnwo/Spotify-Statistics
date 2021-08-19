import React from 'react'
import {Typography,Grid,Card,CardContent} from "@material-ui/core"
import DefaultProfilePicture from '../images/DefaultProfilePicture.jpeg'

const ProfileCard=(props)=>{

    console.log("Data passed to props of Card component is :", props.content)
    
    const imageStyle={
        borderRadius:50,
        float:"center",
        height:100,
        width:100
    }
    const style=props.style;

    var profilePicture;
    profilePicture=props.content.images[0];

    //if user has a Spotify profile picture use it, otherwise use the default image.
    const profilePictureSource= (profilePicture===null||profilePicture===undefined)?DefaultProfilePicture:profilePicture.url

    if(props.content===null||props.content===undefined) //technically, this should not happen
    {
        return(
            <p>""</p>
        )
    }

    return(
            <Grid item xs={12} sm={12} md={12} >
             {/*return a Card Component*/}
             <Card raised={true} >
                 <CardContent style={{...style,textAlign:"center"}}>
                    <img style={imageStyle} src={profilePictureSource} alt="Spotify Profile"></img>
                     <Typography align="center"  variant="h5"> {props.content.display_name} </Typography>
                     <Typography align="center"  variant="h5"> ID:{props.content.id} </Typography>
                     <Typography align="center"  variant="h5"> Country:{props.content.country} </Typography>
                     <Typography align="center"  variant="h5">Followers:{props.content.followers.total} </Typography>
                 </CardContent>

             </Card>

            </Grid>

    )
}

export default ProfileCard;