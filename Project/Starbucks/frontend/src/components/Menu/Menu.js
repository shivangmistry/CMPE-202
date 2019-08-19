import React, { Component } from 'react'
import { Navbar, Nav, Card, Button, Modal, Form } from 'react-bootstrap'
import Cookies from 'js-cookie'
import swal from 'sweetalert'
import axios from 'axios'
import { rootUrl } from '../../config/settings'

export class Menu extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      item: "",
      balance: "0.00"
    };

    this.logout = this.logout.bind(this)
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.paymentHandler = this.paymentHandler.bind(this)
  }

  componentDidMount(){
    //get balance
    axios.get( rootUrl + "/profile", { params : { email: Cookies.get("email") }})
    .then((response) => {
      if(response.data.message === "error" ) swal("Something went wrong.")
      else if(response.data.message==="success"){
        console.log(response.data.data)
        if(response.data.data.cardno) this.setState({ balance: response.data.data.amount })
      }
    })
  }

  logout() {
    Cookies.remove("email")
    this.props.history.push("/login")
  }
  showModal = (e) => { 
    this.setState({ item:e.target.getAttribute("item") ,show: true }) 
  }
  closeModal = (e) => { this.setState({ show: false }) }

  paymentHandler = (e) => {
    e.preventDefault()
    if(this.state.balance >= 1.5 ){
      this.closeModal();
      const newAmount = this.state.balance - 1.5
      let d = new Date()
      let time = d.toLocaleDateString() + " " + d.toLocaleTimeString()
      this.setState({ balance: newAmount })
      const data = {
        email: Cookies.get("email"),
        item: this.state.item,
        time: time,
        amount: newAmount
      }
      console.log(data)
      axios.post( rootUrl + "/postpayment", data)
      .then((response) => {
        if(response.data.message==="error") swal("Something went wrong.")
        else if(response.data.message==="success") swal("Enjoy your coffee!")
      })

    }
    else { swal("Insufficient Balance.") }
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
          <Card className="itemCard">
            <Card.Img variant="top" className="cardImage" src="https://globalassets.starbucks.com/assets/83521e28e4504a5995832987d1fe5daf.jpg" />
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">
                <h4 style={{ float: "left" }} >Frappuccino</h4>
                <h4 style={{ float: "right" }}>Price: $1.50</h4></Card.Subtitle>
              <Button item="Frappuccino" onClick={this.showModal} >Buy Now</Button>
            </Card.Body>
          </Card>
          <Card className="itemCard">
            <Card.Img variant="top" className="cardImage" src="https://thumbs-prod.si-cdn.com/mPWX1r_Zz298e4PErP4HeCTfHb8=/800x600/filters:no_upscale():focal(461x237:462x238)/https://public-media.si-cdn.com/filer/b5/94/b5942caf-8c09-40c2-842e-c52f99f9344f/mocha.jpg" />
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">
              <h4 style={{ float: "left" }} >Mocha</h4>
              <h4 style={{ float: "right" }}>Price: $1.50</h4></Card.Subtitle>
              <Button item="Mocha" onClick={this.showModal} >Buy Now</Button>
            </Card.Body>
          </Card>
          <Card className="itemCard">
            <Card.Img variant="top" className="cardImage" src="https://lh3.googleusercontent.com/-V7z2gKADDD4/Vo7VqOHDUdI/AAAAAAAAgC8/WG0M1DDZ9UU/s800-Ic42/Espresso-Confections.png" />
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">
              <h4 style={{ float: "left" }} >Espresso</h4>
              <h4 style={{ float: "right" }}>Price: $1.50</h4></Card.Subtitle>
              <Button item="Espresso" onClick={this.showModal} >Buy Now</Button>
            </Card.Body>
          </Card>
          <Modal show={this.state.show} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{this.state.item}: $1.50</h4>
              <h4>Balance: ${this.state.balance} </h4>
              <Form onSubmit={this.paymentHandler} >
                <Button variant="secondary" type="submit">
                  SCAN
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    )
  }
}

export default Menu
