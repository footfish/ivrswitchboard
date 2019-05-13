import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faDownload, faEdit } from '@fortawesome/free-solid-svg-icons'
import api from '../lib/SwitchboardAPI'



const RecordingsPlayback = (props) => {
    let audioTag = React.createRef();
    const playSound = () => (audioTag.current.currentTime > 0 && !audioTag.current.paused) ? audioTag.current.pause() : audioTag.current.play()                

    const handleEdit = (e) => props.onEdit(e)
        
    
    return(
    <form>
    <div className="ml-1 form-row align-items-center">

    <div className="col m-1">
    <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">Recording #{props.recording.idx} :</div>
                    </div>
                    <input type="text" name={"newLabel"+props.recording.idx} className="form-control" id={"newLabel"+props.recording.idx} placeholder={props.recording.label} disabled/>
                </div>
    </div>
    <div className="col-auto  m-1">
    <audio ref={audioTag} id="PlaybackPlayer" src={api.addAuthQueryString(props.recording.src)} type="audio/mpeg" >Here</audio>
    <button  type="button" className="ml-1 btn btn-outline-primary" onClick={playSound}>
    <FontAwesomeIcon icon={faVolumeUp} size="lg"/> Listen</button>
    <a  className="ml-1 btn btn-outline-primary" href={api.addAuthQueryString(props.recording.src)} download={"recording"+props.recording.idx+".mp3"}><FontAwesomeIcon icon={faDownload} size="lg"/> Download</a>
    <button  type="button" className="ml-1 btn btn-outline-primary" onClick={handleEdit}>
    <FontAwesomeIcon icon={faEdit} size="lg"/> Edit</button>
    </div>
    </div>
    </form>
    )
}

export default RecordingsPlayback