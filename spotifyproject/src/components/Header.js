import React from 'react'
import {AppBar,Toolbar,Switch,Typography,Button} from '@material-ui/core';
import {NavLink} from 'react-router-dom'

const Header=(props)=>{ //the Header Component which can be used across all the pages.

    const headerStyle=props.style;
    const changeBackgroundColour=props.changeColour
    const currentDarkMode=props.darkMode;
    const link=props.link;
    const text=props.linkText;

    /*const styles={ //isn't being used currently, might use it later
        navLink:{
            fontSize:20,
            fontWeight: "bold",
            color:headerStyle.color
        }
    }*/
   
    return(
        <>
        <AppBar style={headerStyle} position="sticky" color="default" ml="auto">
            <Toolbar style={{justifyContent:"space-between"}}>
        <Button color="secondary" style={ {marginRight:"auto"} } > <NavLink to={"/"} style={{fontSize:20,fontWeight: "bold",color:headerStyle.color}}>Spotify-Stats</NavLink></Button>
        <Switch  checked={currentDarkMode} size='medium'onChange={()=>changeBackgroundColour()}></Switch>
         <Typography style= { {marginRight:"auto" } } variant="subtitle1">Toggle Dark Mode</Typography> 
        <a href={link}><Button color="secondary" style={{fontSize:20, fontWeight:"bold" } }>{text}</Button> </a>         

        </Toolbar>
        </AppBar>


        </>

    )
}

export default Header