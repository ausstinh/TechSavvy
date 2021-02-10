import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { event } from 'jquery';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
class Registration extends Component {
    /**
     * Constuctor for user states (user (session), username, email, answer, question, password, confirm_passwords, errors) 
     * */
    constructor() {
        super();
        this.state = {
            Username: '',
            Email: '',
            Password: '',
            Confirm_password: '',
            Question: '',
            Answer: '',
            User: this.props?.User,
            errors: {
                areErrors: false,
                username: '',
                email: '',
                password: '',
                confirm_password: '',
                alreadyTakenEmail: '',
                answer: '',
                question: '',
            }
        }
        this.User = this?.User?.bind(this);
        this.Email = this?.Email?.bind(this);
        this.Password = this?.Password?.bind(this);
        this.Username = this?.Username?.bind(this);
        this.Question = this?.Question?.bind(this);
        this.Answer = this?.Answer?.bind(this);
        this.handleSubmit = this?.handleSubmit?.bind(this);
        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleQuestion = this.handleQuestion.bind(this);

    }
    /**
     * Handle Submit function that will send a post with the user fields to create the user
     * @param {any} e
     */
    handleSubmit(e) {
        var safeToSubmit = true;
        //check all field validations
        if (this.state.Email === '') {
            this.setState(prevState => ({             
                errors: {
                    ...prevState.errors,
                    email: 'Please enter an Email',
                },
            })); 
            safeToSubmit = false;
        }
         if (this.state.Password === '') {
            this.setState(prevState => ({           
                errors: {
                    ...prevState.errors,
                    password: 'Please enter a Password',
                },
            }));
            safeToSubmit = false;
        }
        if (this.state.Username === '') {
            this.setState(prevState => ({              
                errors: {
                    ...prevState.errors,
                    username: 'Please enter an Username',
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
        if (this.state.Answer === '') {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    answer: 'Please enter an Answer',
                },
            }));
            safeToSubmit = false;
        }
        if (this.state.Question === '') {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    question: 'Please choose a security question',
                },
            }));
            safeToSubmit = false;
        }
        console.log(this.state.Password);
        console.log(this.state.Answer);
        if (safeToSubmit) {
            var user = JSON.stringify({
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.Email,
                Question: this.state.Question,
                Answer: this.state.Answer
            });
            axios.post('https://localhost:44383/api/user/CreateUser', user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            ).then(res => {
                if (res.data.status == "invalid") {
                    this.setState(prevState => ({
                        errors: {
                            ...prevState.errors,
                            alreadyTakenEmail: 'Email is already taken',
                        },
                    }));
                }
                else {
                    sessionStorage.setItem('user', JSON.stringify(res.data.user));
                    window.location = '/SearchJobs';
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
    * Update state of question radio button by change
    *@param  {any} event
    * */
    handleQuestion(event) {
        this.setState({
            Question: event.target.value
        });
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
        console.log(name + value);
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
                    Confirm_password: value,
                    errors: {
                        ...prevState.errors,
                        confirm_password: this.state.Password === value ? '' : 'Please match password',
                    }
                }))  
            case 'answer':
                this.setState(prevState => ({
                    Answer: value,
                    errors: {
                        ...prevState.errors,                   
                    },
                }));
                break;
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
                                        <div>Please select a Security Question:</div>
                                        <div className="radio">
                                          <label>
                                            <input
                                              type="radio"
                                              value="What is your mother's maiden name?"
                                              checked={this.state.Question === "What is your mother's maiden name?"}    
                                              onChange={this.handleQuestion}
                                            />
                                            What is your mother's maiden name?
                                          </label>
                                        </div>
                                        <div className="radio">
                                          <label>
                                            <input
                                              type="radio"
                                              value="What was your first pet's name?"
                                             checked={this.state.Question === "What was your first pet's name?"}
                                             onChange={this.handleQuestion}                              
                                            />
                                            What was your first pet's name?
                                          </label>
                                        </div>
                                        <div className="radio">
                                          <label>
                                            <input
                                              type="radio"
                                              value="What was your best friend's name growing up?"
                                              checked={this.state.Question === "What was your best friend's name growing up?"}
                                              onChange={this.handleQuestion}                           
                                            />
                                            What was your best friend's name growing up?
                                          </label>
                                        </div>
                                        <div className="text-danger">{this.state.errors.question}</div>
                                        <InputGroup className="mb-3">
                                            <Input type="text" name="answer" onChange={this.handleChange} placeholder="Enter answer to selected question" />
                                        </InputGroup >
                                        <div className="text-danger">{this.state.errors.answer}</div>
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