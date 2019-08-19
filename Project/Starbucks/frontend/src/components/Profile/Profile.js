import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import Cookies from 'js-cookie'
import { Form, Modal, Button, Card } from 'react-bootstrap'
import axios from 'axios';
import {rootUrl} from '../../config/settings';
import swal from 'sweetalert'

export class Profile extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      cardno: "",
      cvv: "",
      amount: "",
      name: "",
      email: "",
      cardadded: false,
    }

    this.logout = this.logout.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.cardnoHandler = this.cardnoHandler.bind(this)
    this.cvvHandler = this.cvvHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  componentDidMount(){
    axios.get( rootUrl + "/profile", { params: {"email": Cookies.get("email")}})
    .then((response) => {
      console.log(response.data)
      if(response.data.message==="unauthorised") { 
        swal("Unauthorised Acces.")
        Cookies.remove("email")
        this.props.history.push("/login")
      }
      else if(response.data.message==="success"){
        this.setState({
          name: response.data.data.username,
          email: response.data.data.email,
        })
        if(response.data.data.cardno!=="") {
          this.setState({
            cardno: response.data.data.cardno,
            cvv: response.data.data.cvv,
            amount: response.data.data.amount,
            cardadded: true,
          })
        }
      }
    })
  }

  cardnoHandler = (e) => { this.setState({ cardno: e.target.value}) }
  cvvHandler = (e) => { this.setState({ cvv: e.target.value}) }

  submitHandler = (e) => {
    e.preventDefault()
    this.handleClose();
    const data = {
      email: Cookies.get("email"),
      cardno: this.state.cardno,
      cvv: this.state.cvv
    }
    console.log(data)
    axios.post( rootUrl + "/addcard", data)
    .then((response) => {
      console.log(response.data)
      if(response.data.message==="error") swal("Something went wrong.")
      else if( response.data.message === "success"){
        swal("Card added successfully.")
        this.setState({ 
          cardadded: true,
          show: false,
         })
      }
    })
  }

  logout() {
    Cookies.remove("email")
    this.props.history.push("/login")
  }

  handleClose() { this.setState({ show: false }) }
  handleShow() { this.setState({ show: true }) }

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
          <table>
            <tbody>
              <tr height="50px">
                <td width="100px">Name :</td>
                <td width="100px">{this.state.name}</td>
              </tr>
              <tr height="50px">
                <td width="100px">Email :</td>
                <td width="100px">{this.state.email}</td>
              </tr>
            </tbody>
          </table>
          <br />
          
          {(this.state.cardadded)
            ? <Card id="myCard">
              <Card.Body>
                <Card.Text><br />
                  <table>
                    <tbody>
                      <tr height="50px">
                        <td width="150px">Card Number</td>
                        <td className="digits">{this.state.cardno}</td>
                      </tr>
                      <tr>
                        <td>CVV</td>
                        <td className="digits">{this.state.cvv}</td>
                      </tr>
                    </tbody>
                  </table>
                </Card.Text>
              </Card.Body>
            </Card>
            : <button className="btn btn-dark" onClick={this.handleShow} >Add card</button>}

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit={this.submitHandler} >
                <Form.Group>
                  <Form.Label>Enter Card Number</Form.Label>
                  <Form.Control type="number" name="cardno" placeholder="" pattern="[0-9]{3}" title="Enter a valid card number" onChange={this.cardnoHandler} required />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Enter CVV</Form.Label>
                  <Form.Control type="number" name="cvv" placeholder="" pattern="[0-9]{3}" title="Enter 3 digits" onChange={this.cvvHandler} required />
                </Form.Group> 
                <Button variant="secondary" type="submit">
                  Add Card
                </Button>
              </Form>
          </Modal.Body>
        </Modal>
        </div>
      </div>
    )
  }
}

export default Profile
