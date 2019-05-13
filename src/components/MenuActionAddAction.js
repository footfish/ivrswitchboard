import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'

const MenuActionAddAction = props => {
    return(
            <div className="row">
            <div className="col-1 text-center">
            <button onClick={props.onAddClick} type="button" className="btn btn-link">
            <FontAwesomeIcon icon={faPlusSquare} size="lg"/> 
            </button> 
            </div>
            <div className="col-7">
            <button onClick={props.onAddClick} type="button" className="btn btn-link"><span className="text-primary">
            Add more...
            </span></button> 
            </div>
            </div>
    )
}

export default MenuActionAddAction


