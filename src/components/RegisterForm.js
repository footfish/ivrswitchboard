import React, { Component } from 'react'
import {EMAILADDRESS_PATTERN, PASSWORD_PATTERN, FIRSTNAME_PATTERN, LASTNAME_PATTERN,MOBILENUMBER_PATTERN} from '../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {NDC, CC} from "../config"


export default class RegisterForm extends Component{
    constructor(props) {
        super(props)
        this.state = {email: "", password:"", firstName:"", lastName:"", mobileNumber:"", switchboardNumber:"", terms:false}
        this.handlerChange=this.handlerChange.bind(this) 
    }

    handlerChange(name, value) {this.setState( state => { state[name]=value; return state })}

    render () {
    return(
    <div className="card">
    <div className="card-header"><FontAwesomeIcon icon={faUser} /> Switchboard Registration Form </div>        
    <div className="card-body">
    <form >
    <div className="form-row">
    <div className="form-group col-4">
    <label htmlFor="first_name">Name</label>
    <input type="text" className={validateFirstName(this.state.firstName) ? "form-control" : "form-control is-invalid"} value={this.state.firstName} name="firstName" placeholder="First Name" onChange={e => this.handlerChange(e.target.name, e.target.value)}/>
    </div>
    <div className="form-group col-4">
    <label htmlFor="last_name">&nbsp;</label>
    <input type="last_name" className={validateLastName(this.state.lastName) ? "form-control" : "form-control is-invalid"} value={this.state.lastName} name="lastName" placeholder="Last Name" onChange={e => this.handlerChange(e.target.name, e.target.value)}/>
    </div>
    </div>
    <div className="form-group col-8">
    <label htmlFor="email">Email address</label>
    <input type="text" className={validateEmail(this.state.email) ? "form-control" : "form-control is-invalid"} value={this.state.email} name="email" placeholder="Enter you login email address" onChange={e => this.handlerChange(e.target.name, e.target.value)}/>
    </div>

    <div className="form-group col-4">
    <label htmlFor="password">Password</label>
    <input type="password" className={validatePassword(this.state.password) ? "form-control" : "form-control is-invalid"} value={this.state.password} name="password" placeholder="Choose a login password" onChange={e => this.handlerChange(e.target.name, e.target.value)}/>
    </div>

    <div className="form-group col-4">
    <label htmlFor="mobile_number">Mobile Number</label>
    <input type="text" className={validateMobileNumber(this.state.mobileNumber) ? "form-control" : "form-control is-invalid"} value={this.state.mobileNumber} name="mobileNumber" placeholder="Enter your mobile number" onChange={e => this.handlerChange(e.target.name, e.target.value)}/>
    </div>

    <div className="form-group col-4">
      <label htmlFor="switchboard_number">Switchboard Number</label>
      <select id="switchboard_number" name="switchboardNumber" className={ this.state.switchboardNumber ? "form-control" : "form-control is-invalid"} value={this.state.switchboardNumber}  onChange={e => this.handlerChange(e.target.name, e.target.value)} >
        <option value="" disabled={true}>Choose</option>
        {this.props.e164list.map( (e164, idx) => <option key={idx} value={"0"+NDC+e164.number}>{"0"+NDC+"-"+e164.number}</option>)}
      </select>
    </div>
    <div className="form-group">
    <div className="form-check">
      <input className={ this.state.terms ? "form-check-input" : "form-check-input is-invalid" } type="checkbox" value={!this.state.terms} id="terms" name="terms" checked={this.state.terms}  onChange={e => this.handlerChange(e.target.name, (e.target.value === "true"))}/>
       <label className="form-check-label" htmlFor="terms"> Accept our Terms &amp; Conditions
      </label>
    </div>
  </div>

    <button type="button" disabled={!(this.state.terms && validateMobileNumber(this.state.mobileNumber) && validateLastName(this.state.lastName) && validateFirstName(this.state.firstName) && validateEmail(this.state.email) && validatePassword(this.state.password))} className="btn btn-primary" onClick={() => this.props.onSubmit(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.mobileNumber, this.state.switchboardNumber )}>Submit</button>
    </form>
    </div>
    </div>
     )}
    }

const validateFirstName = firstName => {
        return (FIRSTNAME_PATTERN.test(firstName))
    }
    
const validateLastName = lastName => {
        return (LASTNAME_PATTERN.test(lastName))
    }

const validateMobileNumber = mobileNumber => {
        return (MOBILENUMBER_PATTERN.test(mobileNumber))
    }

const validateEmail = email => {
    return (EMAILADDRESS_PATTERN.test(email))
}

const validatePassword = password => {
    return (PASSWORD_PATTERN.test(password))
}

