import React from 'react';

export default class MenuActionWaitDTMF extends React.Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

handleClick(e) {
    this.props.onClick(e.target.name, e.target.value);
  }

render(){
    const menuItems = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "#" , "*"]
    return(
        <div>
        Wait for keys: 
        {menuItems.map( menuItem => { 
        const buttonActive = this.props.activeDigits.find(i => i === menuItem) ? true : false
        
        return(
        <button value={!buttonActive} name={menuItem} type="button" class={buttonActive ? 'ml-1 btn btn-sm btn-info' : 'ml-1 btn btn-sm btn-outline-secondary'    } onClick={this.handleClick} >{menuItem}</button>
        )})}
        </div>
    )
}



}