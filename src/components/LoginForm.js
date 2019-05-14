import React, { Component } from 'react'
import {EMAILADDRESS_PATTERN, PASSWORD_PATTERN} from '../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


export default class LoginForm extends Component{
    constructor(props) {
        super(props)
        this.state = {email: "", password:""}
        this.handlerChange=this.handlerChange.bind(this) 
    }

    handlerChange(name, value) {this.setState( state => { state[name]=value; return state })}

    render () {
    return(
    <div className="card">
    <div className="card-header"><FontAwesomeIcon icon={faUser} /> Switchboard Login Form </div>        
    <div className="card-body">
    <form>
    <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="text" className={validateEmail(this.state.email) ? "form-control" : "form-control is-invalid"} value={this.state.email} name="email" placeholder="Enter your login email address" onChange={e => this.handlerChange(e.target.name, e.target.value)}/>
    </div>
    <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className={validatePassword(this.state.password) ? "form-control" : "form-control is-invalid"} value={this.state.password} name="password" placeholder="Enter your login password" onChange={e => this.handlerChange(e.target.name, e.target.value)}/>
    </div>
    <button type="button" disabled={!(validateEmail(this.state.email) && validatePassword(this.state.password))} className="btn btn-primary" onClick={() => this.props.onSubmit(this.state.email, this.state.password)}>Submit</button>
    </form>
    </div>
    </div>
     )}
    }



const validateEmail = email => {
    return (EMAILADDRESS_PATTERN.test(email))
}

const validatePassword = password => {
    return (PASSWORD_PATTERN.test(password))
}

