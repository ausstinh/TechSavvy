import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
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
            errors: {
                username: '',
                email: '',
                password: '',
            }
        }

        this.Email = this?.Email?.bind(this);
        this.Password = this?.Password?.bind(this);
        this.Username = this?.Username?.bind(this);
        this.register = this?.register?.bind(this);
    }

    /**
     * Handle Submit function that will send a post with the user fields to create the user
     * @param {any} event
     */
    register(event) {

        if (this.validate(event)) {
            console.log(this.state);

            fetch('http://localhost:51282/Api/user/CreateUser', {
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
                    else
                        alert('error creating user')
                })
        }
    }
      /*
       * NOTE: NOT FINISHED YET BUT CLOSE
       *Handle validation and update state of user state by change
       *@param  {any} event
       * */
    handleChange = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors; 
        //regex test for actual email
        var emailTest = new RegExp(/^(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
        //regex test for 1 uppercase and at least 8 characters
        var passwordTest = new RegExp(/^(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);

        //check event validation by name and set user state
        switch (name) {
            case 'email':              
                errors.email =
                   emailTest.test(value)
                        ? ''
                        : 'Email is not valid!';
                this.setState({ Email: event.target.value });
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'Password must be 8 characters long!'
                            ? passwordTest.test(value)
                                : ''
                                : 'Password needs at least 1 uppercase and be 8 characters long!';
                this.setState({ Password: event.target.value });
                break;
            case 'username':
                this.setState({ Username: event.target.value });
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value }, () => {
            console.log(errors)
        })
    }

/*
   * NOTE: NOT FINISHED YET BUT CLOSE
   *Handle validation and update state of user state by change
   *@param  {any} event
   * */
    validate() {
        const { name, value } = event.target;
        let errors = this.state.errors;
        //regex test for actual email
        var emailTest = new RegExp(/^(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
        //regex test for 1 uppercase and at least 8 characters
        var passwordTest = new RegExp(/^(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);

        //check event validation by name and set user state
        
        switch (name) {
            case 'email':
                errors.email =
                    //is empty?
                    event.target.value == 0
                    ? 'Please enter an email'
                    //is actual email?
                    : emailTest.test(value)
                        ? ''
                        : 'Email is not valid!';
                //set email state
                this.setState({ Email: event.target.value });
                break;
            case 'password':
                errors.password =
                    //is empty?
                    event.target.value == 0
                    ? 'Please enter a password'
                        //password have at least 8 characters and has 1 uppercase?
                        : value.length < 8 && passwordTest.test(value)
                            ? ''
                            : 'Password needs at least 1 uppercase and be 8 characters long!';
                 //set password state
                this.setState({ Password: event.target.value });
                break;
            case 'username':
                  //is empty?
                errors.username = event.target.value == 0
                    ? ''
                    : 'Please enter a username';
                 //set username state
                this.setState({ Username: event.target.value });
                break;
            default:
                break;
        }
        confirm password field will come later

        if (!input["confirm_password"]) {
            isValid = false;
            errors["confirm_password"] = "Please enter your confirm password.";
        }

        if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {

            if (input["password"] != input["confirm_password"]) {
                isValid = false;
                errors["password"] = "Passwords don't match.";
            }
        }

        this.setState({ errors, [name]: value }, () => {
            console.log(errors)
        })
    }

    //Registartion form
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        < Col md="9" lg="7" xl="6">
                            < Card className="mx-4">
                                < CardBody className="p-4">
                                    < Form >

                                        <InputGroup className="mb-3" >
                                            < Input type="text" onChange={this.Email} placeholder="Enter New Email" />
                                        </InputGroup >
                                       <div className="text-danger">{this.state.errors.email}</div>
                                        <InputGroup className="mb-3" >
                                            <Input type="text" onChange={this.Username} placeholder="Enter New Username" />
                                        </InputGroup >
                                        <div className="text-danger">{this.state.errors.username}</div>
                                        <InputGroup className="mb-3">
                                            <Input type="password" onChange={this.Password} placeholder="Enter New Password" />
                                        </InputGroup >
                                        <div className="text-danger">{this.state.errors.password}</div>
                                        <Button onClick={this.register} color="success" block > Create Account</Button>
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