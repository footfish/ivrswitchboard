import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons'

export default class MenuActionNotifyEmail extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        this.props.onClick("NotifyEmail",!this.props.notifyState)
      }

    render() {
        //note:  button+fontawsome because bootstap checkbox is messy for label positioning. 
        return(
            <div className="form-row align-items-center pt-1">
            <div className="col col-auto">Send call notification email:</div>
            <div className="col col-auto">
                        <button onClick={this.handleClick} type="button" className="btn btn-link">
                        <FontAwesomeIcon icon={this.props.notifyState ? faCheckSquare : faSquare} size="lg"/>
                        </button> 
            </div>
            </div>
            )}
}

