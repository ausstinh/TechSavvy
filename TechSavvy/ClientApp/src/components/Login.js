import React, { Component } from 'react';
import './App.css';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Login extends Component {
/*
* Constuctor for credential states (username, password, errors)
*/
    constructor() {
        super();
        this.state = {
            Email: '',
            Password: '',
            access_token: '',            
               errors: {              
                email: '',
                password: '',
                invalidUser: '',
               }
        }  
        this.Password = this?.Password?.bind(this);
        this.Email = this?.Email?.bind(this);
        this.handleSubmit = this?.handleSubmit?.bind(this);
        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

/**
 * Handle Submit function that will send a post with the credential state to authorize the user in the back end
 * @param {any} e
 */
    handleSubmit(e) {    
        var safeToSubmit = true;
        //check all field validations
        if (this.state.Email === '') {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    email: 'Please enter a valid Email',
                }
            }));
            safeToSubmit = false;
        }
        if (this.state.Password === '') {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    password: 'Password needs at least 1 uppercase and be 8 characters long',
                },
            }));
            safeToSubmit = false;
        }
        //if no verification errors then proceed
        if (safeToSubmit) {
            var credentials = JSON.stringify({
                Password: this.state.Password,
                Email: this.state.Email
            });
            //axios post to send credentials and fetch response in the back end
            //if successful then go to index page
            //if unsuccessful display verification message.
            axios.post('https://localhost:44383/api/user/AuthenticateUser', credentials, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.data.status === "invalid") {
                    this.setState(prevstate => ({
                        errors: {
                            ...prevstate.errors,
                            invalidUser: 'Invalid login. Check if email and password are correct.',
                        },
                    }));
                }
                else {
                    //create user session for authentication purposes
                    sessionStorage.setItem('user', JSON.stringify(res.data.user));                  
                    window.location = '/SearchJobs';
                }
                    
            });
        }
    }

    /*
    * 
    *@param  {any} event
    **/
    handleChange(event) {    
        this.validate(event);
    };


    /*
    *
    *Handle validation and update state of user state by change
    *@param  {any} event
    * */
    validate(event) {
        const name = event.target.name;
        const value = event.target.value;

        //check event validation by name and set user state
        switch (name) {
            case 'email':
                this.setState(prevState => ({
                    Email: value,
                    errors: {
                        ...prevState.errors,
                        email: value.match("(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)") || value === '' ? undefined : 'Is not a valid email',
                    }
                }))             
                break;
            case 'password':
                this.setState(prevState => ({
                    Password: value,
                    errors: {
                        ...prevState.errors,
                        password: value.match("(^(?=.*?[A-Z]).{8,}$)") || value === '' ? undefined : 'Password needs at least 1 uppercase and be 8 characters long!',
                    },
                }))
                break;
            default:
                break;
        }
    }
    

     

    //Login Form
    render() {
        return (
            <div className="app flex-row align-items-center">              
                <Container>
                    <div class="title">Tech Savvy</div>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <CardGroup>
                                <Card className="p-2">
                                    <CardBody>
                                        <div className="text-danger">{this.state.errors.invalidUser}</div>
                                    <Form>
                                        <InputGroup className="mb-3">
                                                <Input type="text" name="email" onChange={this.handleChange} placeholder="Enter Email" />
                                            </InputGroup>
                                            <div className="text-danger">{this.state.errors.email}</div>
                                        <InputGroup className="mb-4">
                                                <Input type="password" name="password" onChange={this.handleChange} placeholder="Enter Password" />
                                            </InputGroup>
                                            <div className="text-danger">{this.state.errors.password}</div><br/>
                                            <Button onClick={this.handleSubmit} color="success" block>Login</Button>
                                        </Form><br />
                                        <div class="row" className="mb-2 pageheading" href=''>
                                            <Link class="col-sm-12 btn btn-primary" to="/FindEmail">Forgot Password? </Link>
                                        </div><br />
                                        <div class="row" className="mb-2 pageheading" href=''>
                                            <Link class="col-sm-12 btn btn-primary" to="/Registration">Register Instead </Link>                                      
                                        </div>
                                </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Login;