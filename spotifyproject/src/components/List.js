import React from 'react'
import {useState} from 'react'
import {Modal,Button} from "@material-ui/core"
import ArtistModal from './ArtistModal'
import TracksModal from "./TracksModal"

const List=(props)=>{

    const [modalOpen,setModalOpen]=useState(false);

    console.log("Inside List component")
    console.log("List props are: ",props); 
    //var body;
    var modalBody;

    //var modalBody= <> <img style={imageStyle} src={props.imageObject.url}></img>  <Typography style={{textAlign:"center"} } color="textPrimary" variant="body1">Name:{props.name} </Typography>     </>
    if(props.type==="Artist"){
        const imageURL=props.artistImage.url;
        const artistName= props.name;
        const artistFollowers=props.followers;
        const artistGenres=props.genres;

        modalBody=<ArtistModal  image={imageURL} name={artistName} followers={artistFollowers} genres={artistGenres} />  
        
    }
    
    if(props.type==="Track")
    {
        modalBody=<TracksModal name={props.name} image={props.albumImage.url} album={props.album} artist={props.artist} previewURL={props.previewURL} />
    }
   
    const handleModalClick=()=>{
        console.log("Modal button clicked")
        setModalOpen(!modalOpen)
    }

    //body= <Button color="primary" style={{fontSize:20}} onClick={handleModalClick}>{props.name}</Button>
    //console.log(body)

    return(
        <>
           <li> <Button color="primary" style={{fontSize:20}} onClick={handleModalClick}>{props.name}</Button>  <Modal open={modalOpen} onClose={handleModalClick}><>{modalBody}</></Modal></li> 
           </>
    )
}

export default List


//what if I make each list item (just the artist name), a clickable button, and when clicked, a modal is displayed with additional data?
 // body= <> <img style={imageStyle}src={props.imageObject.url} alt={`${props.name}'s image`}></img> <Typography style={{textAlign:"left"}}color="textPrimary" variant="h6" >{props.name} </Typography> </>; 
