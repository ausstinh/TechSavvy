import React, { Component } from 'react';
import './App.css';
import { Card, CardBody, CardGroup, Col, Container, Row } from 'reactstrap';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
/*
* Constuctor for Manger User states (user, data (users), , errors)
*/
export class ManageUsers extends Component {
    constructor() {
        super();
        this.state = {

            Data: '',           
            errors: {
                noUsers: '',                           
            }
        }
        this.state.Data = this?.Data?.bind(this);    
        this.state.Rows = this?.Rows?.bind(this);
        this.state.onUserDelete = this?.onUserDelete?.bind(this);
        this.state.onUserSuspend = this?.onUserSuspend?.bind(this);
    }
   
    /* Retrieve all users from database
    *@param none
    * return array of users
    */
    componentDidMount() {
        var user = JSON.parse(sessionStorage.getItem('user'));
 
        axios.post('https://localhost:44383/api/user/GetAllUsers', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.data.status === "invalid") {
                this.setState(prevstate => ({
                    errors: {
                        ...prevstate.errors,
                        noUsers: 'No Users found!',
                    },
                }));
            }
            else {
                this.setState(prevState => ({
                    Data: res.data.users,
                }))            
            }
        });

    }
    /* Removes selected user from the database
    *@param user's Id
    * return responce status
    */
    onUserDelete(e) {
        if (window.confirm("Are you sure you want to terminate this user?") == true) {

            var user = JSON.stringify({
                Id: e
            })
            axios.post('https://localhost:44383/api/user/DeleteUser', user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                var user = JSON.parse(sessionStorage.getItem('user'));

                axios.post('https://localhost:44383/api/user/GetAllUsers', user, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    if (res.data.status === "invalid") {
                        this.setState(prevstate => ({
                            errors: {
                                ...prevstate.errors,
                                noUsers: 'No Users found!',
                            },
                        }));
                    }
                    else {
                        this.setState(prevState => ({
                            Data: res.data.users,
                        }))
                    }
                });
            });
        } 
    }
    /* Suspends selected user's access to the site in the database
    *@param user's Id, IsSuspended boolean
    * return responce status
    */
    onUserSuspend(e, s) {

        var user = JSON.stringify({
            Id: e,
            IsSuspended: s
        })
        axios.post('https://localhost:44383/api/user/SuspendUser', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            var user = JSON.parse(sessionStorage.getItem('user'));

            axios.post('https://localhost:44383/api/user/GetAllUsers', user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.data.status === "invalid") {
                    this.setState(prevstate => ({
                        errors: {
                            ...prevstate.errors,
                            noUsers: 'No Users found!',
                        },
                    }));
                }
                else {
                    this.setState(prevState => ({
                        Data: res.data.users,
                    }))
                }
            });
        });
    }
    static displayName = ManageUsers.name;
    //Generated Mange Users Page

    render() {
        //check if user is authenticated
        //if not, redirect to login
        if (this.state?.User === null) {
            sessionStorage.removeItem("user");
            window.location = "/Login";
        }
        else {       
            var users = this.state.Data;    
          
            //use material-ui table to display column and rows of users.
            return (
                <div className="app flex-row align-items-center">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="12" lg="12" xl="12">
                                <CardGroup>
                                    <Card className="p-2 search-table">
                                        <CardBody>
                                            {users && (
                                                <div>
                                            <div className="text-danger">{this.state.errors.noUsers}</div>
                                            <div className="col-lg-12">
                                                        <div>
                                                            <TableContainer component={Paper} >
                                                        <Table size="small" aria-label="a dense table">
                                                            <TableHead>
                                                                <TableRow>                                                                         
                                                                    <TableCell >Email</TableCell>
                                                                    <TableCell >Username</TableCell>
                                                                    <TableCell >Role</TableCell>
                                                                    <TableCell >Suspend</TableCell>
                                                                    <TableCell >Delete</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {users.map((row) => (
                                                                    <TableRow key={row.name}>                                                                             
                                                                        <TableCell >{row.email}</TableCell>
                                                                        <TableCell>{row.username}</TableCell>
                                                                        {row.administartorRole === 0 && (
                                                                            <TableCell>User</TableCell>
                                                                        )}
                                                                        {row.administartorRole === 1 && (
                                                                            <TableCell>Admin</TableCell>
                                                                        )}
                                                                        {row.isSuspended === 0 && (
                                                                            <TableCell > <button onClick={() => this.onUserSuspend(row.id, row.isSuspended)} className="job-button clear">Suspend</button></TableCell>
                                                                        )}
                                                                        {row.isSuspended === 1 && (
                                                                            <TableCell > <button onClick={() => this.onUserSuspend(row.id, row.isSuspended)} className="job-button clear">Unsuspend</button></TableCell>
                                                                        )}
                                                                        <TableCell> <button onClick={() => this.onUserDelete(row.id)} className="job-button clear">Terminate</button></TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </div>
                                                    </div>
                                                    </div>
                                                )}
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
}
export default ManageUsers;