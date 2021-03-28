import React, { Component } from 'react';
import './App.css';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
class FindEmail extends Component {
    /**
    * Constuctor for Email verification and security question states
    * */
    constructor() {
        super();
        this.state = {
            Email: '',
            Question: '',
            Answer: '', 
            DBAnswer: '',
            User: this.props?.user,
            errors: {
                email: '',
                invalidUser: '',
            }
        }
        this.User = this?.User?.bind(this);
        this.DBAnswer = this?.DBAnswer?.bind(this);
        this.Email = this?.Email?.bind(this);
        this.handleEmailSubmit = this?.handleEmailSubmit?.bind(this);
        this.handleQuestionSubmit = this?.handleQuestionSubmit?.bind(this);
        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateRender = this.updateRender.bind(this);
    }

    /**
     * Handle Submit function that will send a post with the Email state to verify that the user exists in the database in the back end
     * @param {any} e
     */
    handleEmailSubmit(e) {
        //check field validation
        if (this.state.Email === '') {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    email: 'Please enter a valid Email',
                }
            }));
        }
        else {
            //axios post to send email state and fetch response in the back end
            //if successful then update form for security question input
            //if unsuccessful display verification message.
            var credentials = JSON.stringify({
                Password: null,
                Email: this.state.Email
            });
            axios.post('https://localhost:44383/api/user/VerifyEmail', credentials, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            ).then(res => {     
                console.log(res.data.question);
                if (res.data.status === "invalid") {
                    this.setState(prevstate => ({
                        errors: {
                            ...prevstate.errors,
                            invalidUser: 'Invalid Email. Check if email is correct.',
                        },
                    }));
                }
                else {             
                    this.updateRender(res);
                }
            });
        }
    }
    updateRender(res) {
        this.setState({         
            Question: res.data.question,
        })
        this.forceUpdate();
    }
    /*
    *Handle validation and update state of user state by change
    *@param  {any} event
    **/
    handleChange(event) {
        this.validate(event);
    };


    /*
    *
    *Handle validation and update state of email state by change
    *@param  {any} event
    * */
    validate(event) {
        const name = event.target.name;
        const value = event.target.value;
        //check event validation by name and set email state
        switch (name) {
            case 'email':
                this.setState(prevState => ({
                    Email: value,
                    errors: {
                        ...prevState.errors,
                        email: value.match("(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)") || value === '' ? "" : 'Is not a valid email',
                    }
                }))
                break;
            case 'answer':
                this.setState(prevState => ({
                    Answer: value,                 
                }))
                break;
            default:
                break;
        }
    }
    //axios post to send answer state and fetch response in the back end
    //if successful then go to reset password page
    //if unsuccessful display verification message.
    handleQuestionSubmit(e) {
        //check field validation
        if (this.state.Answer === '') {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    answer: 'Please enter an answer',
                }
            }));
        }
        else {
            //create user JSON object to send to back-end
            var user = JSON.stringify({ Email: this.state.Email, Answer: this.state.Answer });
            axios.post('https://localhost:44383/api/user/VerifyAnswer', user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                //if answers match then contiue to next page
                if (res.data.status === "invalid") {
                    this.setState(prevstate => ({
                        errors: {
                            ...prevstate.errors,
                            invalidUser: 'Answer does not match what is on file.',
                        },
                    }));
                }
                else {
                    sessionStorage.setItem("Email", this.state.Email);
                    window.location = '/ResetPassword';
                }

            });
           
        }
    }
    //Security Question Form
    render() {
        return (
            this.state.Question || JSON.parse(sessionStorage.getItem('user')).question ? (
                        <div className="app flex-row align-items-center">
                    <Container>
                        <div class="title">Security Question</div>
                                <Row className="justify-content-center">
                                    <Col md="9" lg="7" xl="6">
                                        <CardGroup>
                                            <Card className="p-2">
                                                <CardBody>
                                                    <div className="text-danger">{this.state.errors.invalidUser}</div>
                                                    <Form>
                                                        <div>{this.state.Question}</div><br />
                                                        <InputGroup className="mb-4">
                                                            <Input type="text" name="answer" onChange={this.handleChange} placeholder="Enter Answer" />
                                                        </InputGroup>
                                                        <div className="text-danger">{this.state.errors.answer}</div><br />
                                                        <Button onClick={this.handleQuestionSubmit} color="success" block>Submit</Button>
                                                    </Form><br />
                                                    <div class="row" className="mb-2 pageheading" href=''>
                                                        <Link class="col-sm-12 btn btn-primary" to="/Login">Go Back </Link>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </CardGroup>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
               ) : (
            //Email Verification form
                    <div className="app flex-row align-items-center">
                        <Container>
                            <div class="title">Find Email</div>
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
                                                    <Button onClick={this.handleEmailSubmit} color="success" block>Submit</Button>
                                                </Form><br />
                                                <div class="row" className="mb-2 pageheading" href=''>
                                                    <Link class="col-sm-12 btn btn-primary" to="/Login">Go Back</Link>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </CardGroup>
                                </Col>
                            </Row>
                        </Container>
                    </div>
               )       
       );
    }
}
export default FindEmail;