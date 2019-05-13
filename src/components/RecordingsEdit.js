import React from 'react'
import api from '../lib/SwitchboardAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faUndo, faUpload } from '@fortawesome/free-solid-svg-icons'
import {RECORDINGFILENAME_PATTERN, RECORDINGLABEL_PATTERN} from '../config'

class RecordingsEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          status: "edit",
          idx: props.recording.idx,
          newLabel: props.recording.label,
          newFilename: 'Choose new audio file',
          newFile: null
        }
    
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value } )
        if (e.target.name === "newFilename") {
            this.setState({newFile: e.target.files[0], newFilename: e.target.files[0].name} )            
        }
    }

    handleSubmit(){
        this.setState({status: "updating"} )            
        api.uploadRecording(this.state).then( response => this.setState( { status:  response.status }))
    }


    render() {
    return (
        <form>
          <div className="ml-1 form-row align-items-center">
            <div className="col m-1">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">Recording #{this.props.recording.idx}:</div>
                    </div>
                    <input type="text" name="newLabel" className={validateLabel(this.state.newLabel) ? "form-control" : "form-control is-invalid"} onChange={this.handleChange} placeholder={this.state.newLabel}/>
                </div>
          </div>
          <div className="col-auto m-1">
            <div className="custom-file">
                <input type="file" name="newFilename" className={validateFilename(this.state.newFile) ?  "custom-file-input" : "custom-file-input is-invalid"} onChange={this.handleChange} id={"newFilename"+this.props.recording.idx}/>
                <label className="custom-file-label" htmlFor={"newFilename"+this.props.recording.idx}>{this.state.newFilename}</label>
            </div>
          </div>
            { this.state.status!=="updating" ? 
            (<div className="col-auto m-1"><button name="submit" value={this.props.recording.idx} type="button" className="btn btn-primary" onClick={this.handleSubmit} disabled={!(validateFilename(this.state.newFile) && validateLabel(this.state.newLabel))}><FontAwesomeIcon size="lg" icon={faUpload} /> Upload</button><button name="cancel" value={this.props.recording.idx} type="button" className="ml-1 btn btn-outline-primary" onClick={this.props.onCancel}><FontAwesomeIcon icon={faUndo} size="lg"/> Done</button></div>) :
            (<div className="col-auto m-1"><button name="updating" value={this.props.recording.idx} type="button" className="btn btn-primary" onClick={this.handleSubmit} disabled={true}><FontAwesomeIcon icon={faSpinner} size="lg" pulse /> Uploading </button></div>) }
          </div>
          { this.state.status ==="error" && <span className="ml-3 text-danger">Unfortunately your update failed. </span> }
          { this.state.status ==="success" && <span className="ml-3 text-success">This recording has been updated. </span> }
        </form>

    )
}}

const validateFilename = file => {
    if (!file) return false
    return (RECORDINGFILENAME_PATTERN.test(file.name))
}

const validateLabel = label => {
    if (!label) return false
    return (RECORDINGLABEL_PATTERN.test(label))
}


export default RecordingsEdit