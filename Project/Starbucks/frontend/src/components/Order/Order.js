import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import Cookies from 'js-cookie'
import axios from 'axios'
import { rootUrl } from '../../config/settings'
import swal from 'sweetalert'

export class Order extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      orders: []
    };

    this.logout = this.logout.bind(this)
  }

  componentDidMount(){
    axios.get(rootUrl + "/orders", { params: { "email": Cookies.get("email") } })
    .then((response) => {
      console.log(response.data)
      if(response.data.message === "error") swal("Something went wrong.")
      else if(response.data.message === "success"){
        this.setState({ orders : response.data.data.slice(0,5) })
      }
    })
  }


  logout() {
    Cookies.remove("email")
    this.props.history.push("/login")
  }

  render() {
    return (
      <div className="tab">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="mynavbar" >
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/menu" >Menu</Nav.Link>
              <Nav.Link href="/profile" >Profile</Nav.Link>
              <Nav.Link href="/order" >Orders</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={this.logout} >
                Logout
            </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="contents" >
          {(this.state.orders).map((o, index) => {
            return <div key={index} className="orderItems" >
            <table>
              <tbody>
                <tr>
                  <td width="250px" style={{textAlign:"left"}}>{o.item}</td>
                  <td width="250px" style={{textAlign:"left"}}>x1</td>
                  <td width="250px" style={{textAlign:"left"}}>$1.50</td>
                  <td width="250px" style={{textAlign:"left"}}>{o.time}</td>
                  </tr>
              </tbody>
            </table>
            </div>
          })}
        </div>
      </div>
    )
  }
}

export default Order
