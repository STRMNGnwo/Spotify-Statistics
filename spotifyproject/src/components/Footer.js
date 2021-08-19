import React from 'react' 
import {Typography,AppBar,Toolbar} from "@material-ui/core"

const Footer=(props)=>{
    
    console.log(props);

    const style={
        backgroundColor:props.style.background,
        color:props.style.color,
        height:100
    }

    return(
        <>
         <AppBar position="sticky"  ml="auto">
         <Toolbar style={{...style,justifyContent:"space-between"}}>
        <Typography variant="h6" align="center">Made using React,Express and the Spotify API</Typography>
        <Typography variant="h6" align="right">Designed by Srinivas Ilancheran</Typography>
        </Toolbar>
        </AppBar>
        </>
    )
}

export default Footer