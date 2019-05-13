import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'


const AppStatus = (props) => {
    const GREEN_ALERT = "alert-light"
    const ORANGE_ALERT = "alert-primary"
    const RED_ALERT = "alert-danger"    

    const statusData = { default: {theme: GREEN_ALERT, message: "That's unusual, no information to show you."},
                         times: {theme: GREEN_ALERT, message: "Configure times when your switchboard routes calls to the open or closed menu."},
                         open:  {theme: GREEN_ALERT, message: "Configure how your switchboard routes calls during open hours"},
                         closed:  {theme: GREEN_ALERT, message: "Configure how your switchboard routes calls during closed hours"},
                         recordings:  {theme: GREEN_ALERT, message: "Manage the sound recordings used by your switchboard"},
                         account: {theme: GREEN_ALERT, message:"Manage your account profile."},
                         billing: {theme: GREEN_ALERT, message:"Check your billing statements."},
                         payment: {theme: GREEN_ALERT, message: "Manage your payment Information."},
                         loading: {theme: ORANGE_ALERT, message: "Just a moment, retreiving your data from the service"},
                         uploading: {theme: ORANGE_ALERT, message: "Just a moment, sending your data to the service"},
                         loadError: {theme: RED_ALERT, message: "Error retrieving data. It could be your Internet connection or a service problem.. Make sure your Internet is working and try again later."},
                         uploadError: {theme: RED_ALERT, message: "Error sending data. It could be your Internet connection or a service problem.. Make sure your Internet is working and try again later."},                         
                         modified: {theme: ORANGE_ALERT, message: "You've made some changes to your switchboard. You'll need to click button 'Apply Changes' to make them live."},
                         error: {theme: RED_ALERT, message: "Ooops something went wrong. Is your Internet working ?"},
                         }
    let status 
    statusData.hasOwnProperty(props.status) ? status = props.status : status = "default"

    return(<div className={"alert "+statusData[status].theme} role="alert"><FontAwesomeIcon icon={faInfoCircle}/>&nbsp; {statusData[status].message}
    </div>)
}

export default AppStatus