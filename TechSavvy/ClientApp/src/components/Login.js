import React, { Component } from 'react';
import './App.css';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
class Login extends Component {
/**
* Constuctor for user states (username, password, errors)
* */
    constructor() {
        super();
        this.state = {
            Email: '',
            Password: ''
        }
        this.Password = this?.Password?.bind(this);
        this.Email = this?.Email?.bind(this);
        this.login = this?.login?.bind(this);
    }

/**
 * Handle Submit function that will send a post with the user state to authorize the user in the back end
 * @param {any} event
 */
    login(event) {
        debugger;
        //fetch function to 
        fetch('http://localhost:51282/Api/user/AuthenticateUser', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: this.state.Email,
                Password: this.state.Password
            })
        }).then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                if (result.Status == 'Invalid')
                    alert('Invalid User');
                else
                    this.props.history.push("/Home");
            })
    }

 /*
 * NOTE: NOT FINISHED YET
 *Handle validation and update state of user state by change
 *@param  {any} event
 **/
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
            default:
                break;
        }
        //confirm password field will come later

        //if (!input["confirm_password"]) {
        //    isValid = false;
        //    errors["confirm_password"] = "Please enter your confirm password.";
        //}

        //if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {

        //    if (input["password"] != input["confirm_password"]) {
        //        isValid = false;
        //        errors["password"] = "Passwords don't match.";
        //    }
        //}

        this.setState({ errors, [name]: value }, () => {
            console.log(errors)
        })
    }

    //Login Form
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <CardGroup>
                                <Card className="p-2">
                                    <CardBody>
                                    <Form>
 
                                        <InputGroup className="mb-3">
                                            <Input type="text" onChange={this.Email} placeholder="Enter Email" />
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <Input type="password" onChange={this.Password} placeholder="Enter Password" />
                                        </InputGroup>
                                        <Button onClick={this.login} color="success" block>Login</Button>
                                        </Form><br/>
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