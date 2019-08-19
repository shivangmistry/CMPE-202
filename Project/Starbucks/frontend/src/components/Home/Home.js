import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { rootUrl } from '../../config/settings'
import axios from 'axios'
import Cookies from 'js-cookie'

export class Home extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            
        };

        this.logout = this.logout.bind(this)
    }


    logout(){
        Cookies.remove("email")
        this.props.history.push("/login")
    }

  render() {
    return (
      <div className="tab">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="mynavbar" >
                {/* <Navbar.Brand href="#home">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#3">Home</Nav.Link>
                        <Nav.Link href="#2">Profile</Nav.Link>
                        <Nav.Link href="#1">Orders</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick = {this.logout} >
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div classname="content">
                    
            </div>
      </div>
    )
  }
}

export default Home
