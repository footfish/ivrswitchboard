import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import { Redirect } from "react-router-dom";
import api from '../lib/SwitchboardAPI';


export default class LoginApp extends Component{
    constructor(props) {
        super(props)
        this.state = {message: ""}
        this.handlerSubmit=this.handlerSubmit.bind(this) 
}

    handlerSubmit(email, password)
    {
        api.login(email,password)
        .then( res => {
            res ? this.setState({message: "Logged in"}) : this.setState({message: "Failed to login with those credentials, try again"}) 
        })
        .catch( () => {
            this.setState({message: "Failed to login with those credentials, try again"})
        })
    }
    
    render()
    { return(
            <div className="container mt-4">    
            <div className="row justify-content-center align-items-center">
            <div className="col-12 col-sm-12 col-md-8 col-lg-6 col-xl-4">
            {api.loggedIn() && <Redirect to="/times"/> }                
            {this.state.message !== "" &&<div className="alert alert-danger" role="alert">{this.state.message}</div>}
            <LoginForm onSubmit={this.handlerSubmit}/>
            Don't have an account ? - <a href="/register">Register</a>
            </div></div></div>)
    }
}




