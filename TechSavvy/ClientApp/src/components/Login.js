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
            Password: '',
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
 * Handle Submit function that will send a post with the user state to authorize the user in the back end
 * @param {any} e
 */
    handleSubmit(e) {
        console.log(this.state.Email);
        //check all field validations
        if (this.state.Email === '') {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    email: 'Please enter a valid Email',
                }
            }));  
        }
        if (this.state.Password === '') {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    password: 'Password needs at least 1 uppercase and be 8 characters long',
                },
            }));   
        }
        //fetch function to authenticate user
        fetch('http://localhost:44383/Api/user/AuthenticateUser', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: this.state.Email,
                Password: this.state.Password,
            })
        }).then((Response) => Response.json())
            .then((result) => {
                console.log(result);
                if (result.Status == 'Invalid')
                    this.setState(prevState => ({                     
                        error: {
                            ...prevState.errors,
                            invalidUser:  'Invalid Login',
                        },
                    }));                
                else
                    this.props.history.push("/Home");
            })
    }

    /*
    * NOTE: NOT FINISHED YET
    *Handle validation and update state of user state by change
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
        let errors = this.state.errors;
        console.log(this.state.errors);
        console.log(value);
        //check event validation by name and set user state
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
            case 'password':
                this.setState(prevState => ({
                    Password: value,
                    errors: {
                        ...prevState.errors,
                        password: value.match("(^(?=.*?[A-Z]).{8,}$)") || value === '' ? '' : 'Password needs at least 1 uppercase and be 8 characters long!',
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