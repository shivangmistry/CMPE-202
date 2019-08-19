import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Header from './Header/Header'
import Login from './Login/Login'
import Profile from './Profile/Profile'
import Menu from './Menu/Menu'
import Order from './Order/Order'

export class Main extends Component {
  render() {
    return (
      <div>
        <Route path ="/" component={Header} />
        <Route path ="/login" component={Login} />
        <Route path="/menu" component={Menu} />
        <Route path="/profile" component={Profile} />
        <Route path="/order" component={Order} />
      </div>
    )
  }
}

export default Main
