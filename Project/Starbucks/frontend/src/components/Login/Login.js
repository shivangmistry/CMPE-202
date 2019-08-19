import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { rootUrl } from '../../config/settings';
import Cookies from 'js-cookie'
import { Container, Row, Col } from 'react-bootstrap'
import swal from 'sweetalert';

export class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            name: "",
            newemail: "",
            newpassword: ""
        }

        this.emailHandler = this.emailHandler.bind(this)
        this.passwordHandler = this.passwordHandler.bind(this)
        this.nameHandler = this.nameHandler.bind(this)
        this.newemailHandler = this.newemailHandler.bind(this)
        this.newpasswordHandler = this.newpasswordHandler.bind(this)
        this.loginHandler = this.loginHandler.bind(this)
        this.loginHandler = this.loginHandler.bind(this)
        this.signupHandler = this.signupHandler.bind(this)

    }

    emailHandler = (e) => {
        this.setState({ email: e.target.value })
    }
    passwordHandler = (e) => {
        this.setState({ password: e.target.value })
    }
    nameHandler = (e) => {
        this.setState({ name: e.target.value })
    }
    newemailHandler = (e) => {
        this.setState({ newemail: e.target.value })
    }
    newpasswordHandler = (e) => {
        this.setState({ newpassword: e.target.value })
    }

    loginHandler = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        // console.log(data)
        axios.post( rootUrl + "/login", data)
        .then((response) => {
            console.log(response.data)
            if(response.data.message==="success"){
                Cookies.set("email", data.email)
                this.props.history.push("/menu")
            }
            else {
                swal(response.data.message)
            }
        })
    }

    signupHandler = (e) => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            email: this.state.newemail,
            password: this.state.newpassword
        }
        // console.log(data)
        axios.post( rootUrl + "/signup", data)
        .then((response) => {
            console.log(response.data)
            if(response.data.message==="success"){
                swal("Signup Successful!")
                Cookies.set("email", data.email)
                this.props.history.push("/menu")
            }
            else{
                swal(response.data.message)
            }
        })
    }

    

  render() {
    return (
      <div className="tab">
        <Container>
        <Row>
            <Col sm={6} >
                <h3>Login</h3>
                <Form onSubmit = {this.loginHandler} >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.emailHandler} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" onChange={this.passwordHandler} required />
                    </Form.Group>
                    
                    <Button variant="dark" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
            <Col sm={6} >
                <h3>Signup</h3>
                <Form onSubmit={this.signupHandler} >
                    <Form.Group >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter your name" onChange={this.nameHandler} required />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.newemailHandler} required />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" onChange={this.newpasswordHandler} required />
                    </Form.Group>

                            <Button variant="dark" type="submit">
                        Submit
                        </Button>
                </Form>
            </Col>
        </Row>
        </Container>
      </div>
    )
  }
}

export default Login
