import React, { Component } from 'react'
import Cookies from 'js-cookie'

export class Header extends Component {

    constructor(props){
        super(props)
        if(!Cookies.get("email")) this.props.history.push("/login")
    }

  render() {
    return (
      <div id="header">
        <img src="https://www.delpoplumbinghvac.com/wp-content/uploads/2015/11/starbucks-logo.png" alt="logo" id="headerLogo" />
        <h1 id="headerTitle" >Welcome to Starbucks</h1>
      </div>
    )
  }
}

export default Header
