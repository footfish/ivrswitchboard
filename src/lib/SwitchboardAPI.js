import {API_URI, API_AUTHURI , API_HEADERS} from "../config"
import decode from "jwt-decode";

class SwitchboardAPI {
    
    constructor() {
        this.apiURL = API_URI 
    }

    //Logs into api with email/password. Returns a Promise of true/false on success. JWT access token and uid kept in sessionStorage. 
    login(email, password) { 
        return fetch(API_AUTHURI, { //Get a JWT
          method: "POST",
          headers:  API_HEADERS,          
          body: JSON.stringify({
            email,
            password
          })
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data.access_token !== 'undefined' )
                {
                sessionStorage.setItem("access_token", data.access_token) //save JWT for authentication 
                return true
            } else {
                return false
            }
        }).catch( () => false )
      }

    logout(){
        sessionStorage.removeItem("access_token"); //clear JWT
    }

    loggedIn(){
        const access_token = sessionStorage.getItem("access_token")
        if( access_token !== null){
            try {
                const decoded = decode(access_token);
                if (decoded.exp > Date.now() / 1000) { // Check if token is expired.
                    return true
                } else {
                    return false
                }
              } catch (err) {
                return false
              }

        } else {
            return false
        }
    }
    
    readTimes() {
        API_HEADERS.Authorization = sessionStorage.getItem("access_token")
        return fetch(this.apiURL, {
            headers:  API_HEADERS,          
        })
        .then(resp => resp.json())
        .then(data => {
            let apiResp = {status: "loadError"}
            if (typeof data.number !== 'undefined' && data.number !== "") {
                apiResp = {status: "times", localChanges: false, number: data.number, schedule: data.schedule, routeOption: data.routeOption}
            } 
            return (apiResp)
        })
        .catch (() => {
            return ({status: "loadError"})
        })
    }

    updateTimes(payload) {
        API_HEADERS.Authorization = sessionStorage.getItem("access_token")
        return fetch(this.apiURL, { 
            method: 'PATCH', 
            body: JSON.stringify(payload),
            headers:  API_HEADERS
        })
        .then(resp => resp.json())
        .then(data => {
            let apiResp = {status: "uploadError", localChanges: true}
            if (typeof data.number !== 'undefined' && data.number !== "") {
                apiResp = {status: "times", localChanges: false, number: data.number, schedule: data.schedule, routeOption: data.routeOption}
            }
            return (apiResp)
        })
        .catch (() => {
            return ({status: "uploadError", localChanges: true})
        })
    }


    readOpenMenu(){
        API_HEADERS.Authorization = sessionStorage.getItem("access_token")
        return fetch(this.apiURL, {
            headers:  API_HEADERS,          
        })
        .then(resp => resp.json())
        .then(data => {
            let apiResp = {status: "loadError"}
            if (typeof data.number !== 'undefined' && data.number !== "") {
                apiResp = data.openMenu
                apiResp.status = "open"
                apiResp.localChanges = false
                apiResp.recordings = data.recordings
                apiResp.number = data.number
            }
            return (apiResp)
        })
        .catch (() => {
            return ({status: "loadError"})
        })
    }

    updateOpenMenu(payload){
        API_HEADERS.Authorization = sessionStorage.getItem("access_token")
        return fetch(this.apiURL, { 
            method: 'PATCH', 
            body: JSON.stringify(payload),
            headers:  API_HEADERS
        })
        .then(resp => resp.json())
        .then(data => {
            let apiResp = {status: "uploadError", localChanges: true}
            if (typeof data.number !== 'undefined' && data.number !== "") {
                apiResp = data.openMenu
                apiResp.status = "open"            
                apiResp.localChanges = false
                apiResp.recordings = data.recordings
                apiResp.number = data.number
            }
            return(apiResp)
        })
        .catch (() => {
            return ({status: "uploadError", localChanges: true})
        })
    }


    readClosedMenu(){
        API_HEADERS.Authorization = sessionStorage.getItem("access_token")
        return fetch(this.apiURL,{
            headers:  API_HEADERS,          
        })
        .then(resp => resp.json())
        .then(data => {
            let apiResp = {status: "loadError"}
            if (typeof data.number !== 'undefined' && data.number !== "") {
                apiResp = data.closedMenu
                apiResp.status = "closed"            
                apiResp.localChanges = false
                apiResp.recordings = data.recordings
                apiResp.number = data.number
            }
            return(apiResp)
        })
        .catch (() => {
            return ({status: "loadError"})
        })
    }

    updateClosedMenu(payload){
        API_HEADERS.Authorization = sessionStorage.getItem("access_token")
        return fetch(this.apiURL, { 
            method: 'PATCH', 
            body: JSON.stringify(payload),
            headers:  API_HEADERS
        })
        .then(resp => resp.json())
        .then(data => {
            let apiResp = {status: "uploadError", localChanges: true}
            if (typeof data.number !== 'undefined' && data.number !== "") {
                apiResp = data.closedMenu
                apiResp.status = "closed"            
                apiResp.localChanges = false
                apiResp.recordings = data.recordings
                apiResp.number = data.number
            }
            return (apiResp)
        })
        .catch (() => {
            return ({status: "uploadError", localChanges: true})
        })
    }

  
}

export default (new SwitchboardAPI() )