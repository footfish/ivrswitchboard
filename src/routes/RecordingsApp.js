import React, { Component } from 'react'


import AccountHeader from '../components/AccountHeader'
import MainMenu from '../components/MainMenu'
import AppStatus from '../components/AppStatus'
import { Redirect } from "react-router-dom";
import api from '../lib/SwitchboardAPI'
import RecordingsItem from '../components/RecordingsItem'
import SectionBorder from '../components/SectionBorder'



export default class RecordingsApp extends Component{
    constructor(props) {
        super(props)
        this.state = {status: "loading" }
        this.refreshRecordings = this.refreshRecordings.bind(this)
        this.addRecording = this.addRecording.bind(this)
}

refreshRecordings() {
    this.setState( {status: "loading"} )
    if (api.loggedIn()) {
          api.readRecordings().then( response => this.setState( state => response ))
    }
}

addRecording(){
    this.setState( (state) => { state.recordings.push({}); return(state)} )
}

componentDidMount() {
    this.setState( {status: "loading"} )
    if (api.loggedIn()) {
          api.readRecordings().then( response => this.setState( state => response ))
    }
}
    
    render()
    {
        return(<div>
            {!api.loggedIn() && <Redirect to="/login"/> }      
            <AccountHeader switchboardNumber={this.state.number} linksActive={true}/>
            <MainMenu/>
            <AppStatus status={this.state.status} />
            <SectionBorder label="Recordings" borderBottom={true}>
            {this.state.recordings && this.state.recordings.map( (recording, idx) => <RecordingsItem key={idx} recording={{ idx:idx, label: recording.label, src: recording.src }} refresh={this.refreshRecordings} />)}
            {this.state.recordings && <AddRecording addRecording={this.addRecording}/>}
            </SectionBorder></div>)
    }

}

const AddRecording = ({addRecording}) => <button name="add" value="add" type="button" className="m-3 btn btn-primary" onClick={addRecording} >Add New Recording</button>




