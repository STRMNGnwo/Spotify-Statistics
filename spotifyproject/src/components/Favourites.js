import React from 'react'
import {Typography,Grid,Card,CardContent,Button} from "@material-ui/core"

const Favourites=(props)=>{

    console.log("Data passed to props is: ",props);
        
    if(props.content===null||props.content===undefined)
        {
            return(
        <Grid item xs={12} sm={12} md={12} >
         {/*return a Card Component*/}
         <Card raised={true} >
             <CardContent style={{...props.style,textAlign:"center"}} >
                 <Typography align="center" variant="h2"> {props.text} </Typography>
                 <Button color="primary"onClick={props.onClickFunction}> <Typography color="primary">{`Get ${props.text} `}</Typography></Button>
             </CardContent>
         </Card>

        </Grid>
            )
        }

        else{
            return(
                <Grid item xs={12} sm={12} md={12} >
         {/*return a Card Component*/}
         <Card raised={true} >
             <CardContent style={{...props.style,textAlign:"center"}}>
                 <Typography align="center"  variant="h2"> {`${props.text} are`} </Typography>
                 {/*display props.content here, which would be a list of artist names or track names*/}
                
                <ol> {props.content}</ol>  {/* Actually the most important bit xD */}
             </CardContent>
         </Card>
        </Grid>

            )
        }



}

export default Favourites