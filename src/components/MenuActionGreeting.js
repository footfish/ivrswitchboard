import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'


const MenuActionGreeting = (props) => {
    let audioTag = React.createRef();

    const playSound = () => (audioTag.current.currentTime > 0 && !audioTag.current.paused) ? audioTag.current.pause() : audioTag.current.play()                
    const handleChange = (e) => props.onChange(e.target.name, e.target.value)
    
    
    const timesOptions = ["1 time", "2 times", "3 times"]
    return(<div className="form-row align-items-center pt-1">
    <div className="col col-auto">Playback</div>
    <div className="col col-auto" >
        <select name="recordingId" className="form-control" onChange={handleChange}>
         {props.recordingOptions.map( (recording, idx) => <option value={idx} selected={props.settings.recordingId===idx && true}>{recording.label}</option>)}
        </select>
    </div>
    <div className="col col-auto">
            <audio ref={audioTag} id="PlaybackPlayer" src={props.recordingOptions[props.settings.recordingId].src} type="audio/mpeg" ></audio>
            <button  type="button" className="btn btn-light btn-sm rounded-circle" onClick={playSound}>
            <span className="text-primary"><FontAwesomeIcon icon={faVolumeUp} size="lg"/> </span>
            </button>
    </div>
    <div className="col col-auto">
                <select name="times" className="form-control" onChange={handleChange}>
                {timesOptions.map( (option, idx) => <option  selected={props.settings.times===(idx+1) && true} value={idx+1}>{option}</option>)}
                </select>
    </div>
        </div>)
}

export default MenuActionGreeting