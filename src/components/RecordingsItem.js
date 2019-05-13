import React from 'react'
import RecordingsEdit from '../components/RecordingsEdit'
import RecordingsPlayback from '../components/RecordingsPlayback'

class RecordingsItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          edit: !(props.recording.src)   //undefined recordings open in 'edit mode'
        }
    
        this.toggleEdit = this.toggleEdit.bind(this)
      }

    toggleEdit(){
        if (this.state.edit) this.props.refresh()
        this.setState({edit: !this.state.edit} )            
    }


    render() {
    return (<li className="list-group-item px-0">
      { this.state.edit ? <RecordingsEdit recording={this.props.recording} onCancel={this.toggleEdit}/> : <RecordingsPlayback recording={this.props.recording} onEdit={this.toggleEdit}/> }
      </li>
    )
}}



export default RecordingsItem