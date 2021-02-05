import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { event } from 'jquery';
import axios from 'axios';
class ResetPassword extends Component {
    /**
     * Constuctor for user states (username, password, errors) 
     * */
    constructor() {
        super();
        this.state = {         
            Password: '',
            Confirm_password: '',          
            errors: {
                areErrors: false,          
                password: '',
                confirm_password: '',
                errorOccured: '',
            }
        }

        this.Password = this?.Password?.bind(this);     
        this.handleSubmit = this?.handleSubmit?.bind(this);
        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
   
    /**
     * Handle Submit function that will send a post with the user fields to create the user
     * @param {any} e
     */
    handleSubmit(e) {
        var safeToSubmit = true;

        if (this.state.Password === '') {
            this.setState(prevState => ({           
                errors: {
                    ...prevState.errors,
                    password: 'Please enter Password',
                },
            }));
            safeToSubmit = false;
        }       
        if (this.state.Confirm_password !== this.state.Password) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    confirm_password: 'Please match passwords',
                },
            }));
            safeToSubmit = false;
        }
        if (safeToSubmit) {

            var email = sessionStorage.getItem('Email');
            var credentials = JSON.stringify({
                Password: this.state.Password,
                Email: email,
            });

            //axios post to send credentials and fetch response in the back end
            //if successful then go to index page
            //if unsuccessful display verification message.
            axios.post('https://localhost:44383/api/user/ResetPassword', credentials, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.data.status == "invalid") {
                    this.setState(prevstate => ({
                        errors: {
                            ...prevstate.errors,
                            errorOccured: 'Something went wrong...',
                        },
                    }));
                }
                else {
                    if (sessionStorage.getItem("user") === null) {
                        sessionStorage.removeItem("Email");
                        window.location = '/Login';
                    }
                    else {
                        sessionStorage.setItem("message", "Your Password has been updated");
                        sessionStorage.removeItem("Email");
                        window.location = '/Profile';
                    }
                }

            });
        }
    }


    /*
    *Handle validation and update state of user state by change
    *@param  {any} event
    * */
    handleChange(event) {
        this.validate(event);
    }
    /*
     *Handle validation and update state of user state by change
     *@param  {any} event
     * */
    validate(event) {    
        if (this.state.errors != null) {
            event.preventDefault();
        }
        const name = event.target.name;
        const value = event.target.value;
     
        //check event validation by name and set user state
        switch (name) {       
            case 'password':
                this.setState(prevState => ({
                    Password: value,
                    errors: {
                        ...prevState.errors,
                        password: value.match("(^(?=.*?[A-Z]).{8,}$)") || value === '' ? '' : 'Password needs at least 1 uppercase and be 8 characters long',
                    },
                }));
                break;          
            case 'confirm_password':
                this.setState(prevState => ({
                    Confirm_password: value,
                    errors: {
                        ...prevState.errors,
                        confirm_password: this.state.Password === value ? '' : 'Please match password',
                    }
                }))       
            default:
                break;
        }
    }


    //Registartion form
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <div class="title">Reset Password</div>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <div className="text-danger">{this.state.errors.errorOccured}</div>
                                    <Form>                                      
                                        <InputGroup className="mb-3">
                                            <Input type="password" name="password" onChange={this.handleChange} placeholder="Enter New Password" />
                                        </InputGroup >
                                        <div className="text-danger">{this.state.errors.password}</div>
                                        <InputGroup className="mb-3">
                                            <Input type="password" name="confirm_password" onChange={this.handleChange} placeholder="Enter Password Again" />
                                        </InputGroup >
                                        <div className="text-danger">{this.state.errors.confirm_password}</div>
                                        <Button onClick={this.handleSubmit} color="success" block > Reset Password</Button>
                                    </Form><br />                                  
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default ResetPassword;