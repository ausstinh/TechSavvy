import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { event } from 'jquery';
class Registration extends Component {
    /**
     * Constuctor for user states (username, password, errors) 
     * */
    constructor() {
        super();
        this.state = {
            Username: '',
            Email: '',
            Password: '',
            Confirm_password: '',
            errors: {
                areErrors: false,
                username: '',
                email: '',
                password: '',
                confirm_password: '',
                alreadyTakenEmail: '',
            }
        }

        this.Email = this?.Email?.bind(this);
        this.Password = this?.Password?.bind(this);
        this.Username = this?.Username?.bind(this);
        this.handleSubmit = this?.handleSubmit?.bind(this);
        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    /**
     * Handle Submit function that will send a post with the user fields to create the user
     * @param {any} e
     */
    handleSubmit(e) {

        //check all field validations
        if (this.state.Email === '') {
            this.setState(prevState => ({             
                errors: {
                    ...prevState.errors,
                    email: 'Please enter Email',
                },
            })); 
        }
        if (this.state.Password === '') {
            this.setState(prevState => ({           
                errors: {
                    ...prevState.errors,
                    password: 'Please enter Password',
                },
            }));
        }
        if (this.state.Username === '') {
            this.setState(prevState => ({              
                errors: {
                    ...prevState.errors,
                    username: 'Please enter Username',
                },
            }));
        }
        if (this.state.Confirm_password !== this.state.Password) {
            this.setState(prevState => ({            
                errors: {
                    ...prevState.errors,
                    confirm_password: 'Please match passwords',
                },
            }));
        }

        fetch('http://localhost:44383/Api/user/CreateUser', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.Email,
            })
        }).then((Response) => Response.json())
            .then((Result) => {
                if (Result.Status == 'Success')
                    this.props.history.push("/Home");
                else {
                    this.setState(prevState => ({
                        error: {
                            ...prevState.errors,
                            alreadyTakenEmail: 'Email is not Valid',
                        },
                    }));
                }
            })
    }


    /*
    * NOTE: NOT FINISHED YET BUT CLOSE
    *Handle validation and update state of user state by change
    *@param  {any} event
    * */
    handleChange(event) {
        this.validate(event);
    }
    /*
     * NOTE: NOT FINISHED YET BUT CLOSE
     *Handle validation and update state of user state by change
     *@param  {any} event
     * */
    validate(event) {
        if (this.state.errors != null) {
            event.preventDefault();
        }
        const name = event.target.name;
        const value = event.target.value;
        let errors = this.state.errors;
        console.log(name);
        console.log(value);
        console.log(value.match("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"));

        //check event validation by name and set user state
        switch (name) {
            case 'email':
                this.setState(prevState => ({
                    Email: value,
                    errors: {
                        ...prevState.errors,
                        email: value.match("(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)") || value === '' ? "" : 'Not is not a valid email',
                    },
                }));
                break;
            case 'password':
                this.setState(prevState => ({
                    Password: value,
                    errors: {
                        ...prevState.errors,
                        password: value.match("(^(?=.*?[A-Z]).{8,}$)") || value === '' ? '' : 'Password needs at least 1 uppercase and be 8 characters long',
                    },
                }));
                break;
            case 'username':
                this.setState(prevState => ({
                    Username: value,
                    errors: {
                        ...prevState.errors,
                        username: value === ''  ? '': '',
                    },
                }));
                break;
            case 'confirm_password':
                this.setState(prevState => ({
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
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <div className="text-danger">{this.state.errors.alreadyTakenEmail}</div>
                                    <Form>
                                        <InputGroup className="mb-3" >
                                            <Input type="text" name="email" onChange={this.handleChange} placeholder="Enter New Email" />
                                        </InputGroup >
                                        <div className="text-danger">{this.state.errors.email}</div>
                                        <InputGroup className="mb-3" >
                                            <Input type="text" name="username" onChange={this.handleChange} placeholder="Enter New Username" />
                                        </InputGroup >
                                        <div className="text-danger">{this.state.errors.username}</div>
                                        <InputGroup className="mb-3">
                                            <Input type="password" name="password" onChange={this.handleChange} placeholder="Enter New Password" />
                                        </InputGroup >
                                        <div className="text-danger">{this.state.errors.password}</div>
                                        <InputGroup className="mb-3">
                                            <Input type="password" name="confirm_password" onChange={this.handleChange} placeholder="Enter Password Again" />
                                        </InputGroup >
                                        <div className="text-danger">{this.state.errors.confirm_password}</div>
                                        <Button onClick={this.handleSubmit} color="success" block > Create Account</Button>
                                    </Form><br />
                                    <div class="row" className="mb-2 pageheading">
                                        <Link to='/Login' class="col-sm-12 btn btn-primary"> Login Instead </Link>
                                    </div >
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Registration;