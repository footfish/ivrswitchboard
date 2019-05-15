import React, { Component } from 'react'
import RegisterForm from '../components/RegisterForm'
import { Redirect } from "react-router-dom";
import api from '../lib/SwitchboardAPI';
import {NDC, CC} from "../config"


export default class LoginApp extends Component{
    constructor(props) {
        super(props)
        this.state = {message: "", status: "loading", e164: null}
        this.handlerSubmit=this.handlerSubmit.bind(this) 
}

componentDidMount() {
    this.setState( {status: "loading"} )
    api.readE164(CC, NDC).then( response => this.setState( state => response )) 
}

    handlerSubmit(firstName, lastName, email, password, mobileNumber, switchboardNumber)
    {
        api.register(firstName, lastName, email, password, mobileNumber, switchboardNumber)
        .then( res => {
            res ? this.setState({status: "registered"}) : this.setState({message: "Failed to register an account with the information provided, try again"}) 
        })
        .catch( () => {
            this.setState({message: "Failed to register an account with the information provided, try again"})
        })
    }
    
    render()
    { return(
            <div className="container mt-4">    
            <div className="row justify-content-center align-items-center">
            <div className="col-12 col-sm-12 col-md-8 col-lg-6 col-xl-4">
            {api.loggedIn() && <Redirect to="/times"/> }                
            {this.state.message !== "" &&<div className="alert alert-danger" role="alert">{this.state.message}</div>}
            {this.state.status === "registered" &&<div className="alert alert-success" role="alert">Congratulations you have registered - <a href="/login">Login here</a></div>}
            {this.state.status === "e164Loaded" && <RegisterForm onSubmit={this.handlerSubmit} e164list={this.state.e164}/> }
            {this.state.status === "loading" && <div>Loading...</div>}
            {this.state.status !== "registered" && <div>Already have an account ? - <a href="/login">Login</a></div>}
            </div></div></div>)
    }
}




