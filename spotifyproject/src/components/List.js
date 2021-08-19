import React from 'react'
import {useState} from 'react'
import {Modal,Button} from "@material-ui/core"
import ArtistModal from './ArtistModal'
import TracksModal from "./TracksModal"

const List=(props)=>{

    const [modalOpen,setModalOpen]=useState(false);

    //console.log("Inside List component")
    //console.log("List props are: ",props); 
    
    var modalBody;

    const style=props.style;

    //console.log("List style is: ",style);

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

    return(
        <>
           <li> <Button style={{...style,fontSize:20,marginTop:10}} onClick={handleModalClick}>{props.name}</Button>  <Modal open={modalOpen} onClose={handleModalClick}><>{modalBody}</></Modal></li> 
           </>
    )
}

export default List

