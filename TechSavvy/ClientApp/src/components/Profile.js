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
import { Link } from 'react-router-dom';

/*
* Constuctor for credential states (user, data (jobs), search key, errors)
*/
export class Profile extends Component {
    constructor() {
        super();
        this.state = {
            User: this.props?.user,
            Data: '',
            Job: {
                jobId:'',
                id: '',
                title: '',
                type: '',
                description: '',
                company: '',
                company_url: '',
                url: '',
                location: '',
                how_to_apply: '',
                company_logo: '',
                created_at: '',
                users_id: ''
            },
            SearchKey: '',
            errors: {
                noJobs: '',
                searchKey: '',
                JobAlreadySaved: '',
            }
        }
        this.state.Data = this?.Data?.bind(this);
        this.state.Job = this?.Job?.bind(this);   
        this.state.User = JSON.parse(sessionStorage.getItem('user'));  
        this.onJobDelete = this.onJobDelete.bind(this);
        this.onClearHistory = this.onClearHistory.bind(this);
        this.onUpdatePassword = this.onUpdatePassword.bind(this);
        this.SelectFirstCell = this.SelectFirstCell.bind(this);      
        this.handleCellClick = this.handleCellClick.bind(this);
    }
    /* Retrieve user jobs from Database
    *@param none
    * return json array of user jobs data
    */
    componentDidMount() {
        var user = JSON.parse(sessionStorage.getItem('user'));
        axios.post('https://localhost:44383/api/job/RetrieveUserJobs', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.data.status === "invalid") {
                this.setState(prevstate => ({
                    errors: {
                        ...prevstate.errors,
                        noJobs: 'No jobs saved yet!',
                    },
                }));
            }
            else {
                this.setState(prevState => ({
                    Data: res.data.userJobs,
                }))
                
            }
        });

    }
     /* Redirect to find email js page
    *@param none
    */
    onUpdatePassword() {
        window.location = '/FindEmail';
    }
    /* Clear user's search history in the database
    *@param none
    * return responce status
    */
    onClearHistory() {
        var user = JSON.parse(sessionStorage.getItem('user'));
        axios.post('https://localhost:44383/api/user/ClearRecentSearches', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {  
            if (res.data.status !== "invalid") {            
                sessionStorage.setItem('user', JSON.stringify(res.data.user));  
                this.forceUpdate();
            }
        });
    }
    SelectFirstCell() {
        var myTable = document.getElementsByClassName('MuiDataGrid-cell');
        var row = myTable[0];
        if (row != undefined) {
            row.click();
        }
    }
    /* Remove job from the user's saved jobs in the database
    *@param none
    *return responce status
    */
    onJobDelete(e) {
        var user = JSON.parse(sessionStorage.getItem('user'));        
        var job = JSON.stringify({
            jobId:this.state.Job?.jobId,
            id: this.state.Job?.id,
            title: this.state.Job?.title,
            type: this.state.Job?.type,
            description: this.state.Job?.description,
            company: this.state.Job?.company,
            company_url: this.state.Job?.company_url,
            url: this.state.Job?.url,
            location: this.state.Job?.location,
            how_to_apply: this.state.Job?.how_to_apply,
            company_logo: this.state.Job?.company_logo,
            created_at: this.state.Job?.created_at,
            users_id: user["id"]
        });

        axios.post('https://localhost:44383/api/job/RemoveJob', job, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.data.status === "invalid") {
                this.setState(prevstate => ({
                    errors: {
                        ...prevstate.errors,
                        jobAlreadySaved: res.data.message,
                    },
                }));
            }
            else {
                this.setState(prevstate => ({
                    errors: {
                        ...prevstate.errors,
                        jobAlreadySaved: 'Job has been deleted from your profile',
                    },
                }));
                var user = JSON.parse(sessionStorage.getItem('user'));
                axios.post('https://localhost:44383/api/job/RetrieveUserJobs', user, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    if (res.data.status === "invalid") {
                        this.setState(prevstate => ({
                            errors: {
                                ...prevstate.errors,
                                noJobs: 'No jobs saved yet!',
                            },
                        }));
                    }
                    else {
                        this.setState(prevState => ({
                            Data: res.data.userJobs,
                        }))

                    }
                });
            }
        });
    }

    
    handleCellClick(e) {
        this.setState(prevstate => ({          
            Job: e.row,
            errors: {
                ...prevstate.errors,
                jobAlreadySaved: '',
            },
        }));
    }
    static displayName = Profile.name;
    //Generated Landing Page

    render() {
        //check if user is authenticated
        //if not, redirect to login
        if (this.state?.User === null) {
            sessionStorage.removeItem("user");
            window.location = "/Login";
        }
        else {
            var jobColumns = [{ field: 'title', headerName: 'Your Saved Jobs: ', width: 300, sortable: false }];
            if (this.state.Data !== undefined) {
                jobColumns = [{ field: 'title', headerName: 'Your Saved Jobs: ' + this.state.Data?.length, width: 300, sortable: false }];
            }  
            var user = JSON.parse(sessionStorage.getItem('user'));
            var searches = user.recentSearches.split(",");    
            
            return (
                <div className="app flex-row align-items-center">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="12" lg="12" xl="12">
                                <CardGroup>
                                    <Card className="p-2 search-table-profile">
                                        <CardBody>
                                          <div className="text-danger">{this.state.errors.noJobs}</div>
                                            <div className="col-lg-12">
                                                <div>
                                                    <button onClick={this.onClearHistory} className="job-button clear col-lg-3">Clear Search History</button>
                                                    <button onClick={this.onUpdatePassword} className=" job-button col-lg-3">Update Password</button>
                                                </div>
                                            </div>                                         
                                            <div className="search-box col-lg-12">
                                                <div>
                                                    <TableContainer className="search-history">
                                                        <Table aria-label="simple table">                                                      
                                                            <TableBody className="search-row">
                                                                <TableRow>
                                                                    <TableCell className="search-cell" align="center">Search History:</TableCell>
                                                                </TableRow>                                                             
                                                                {searches.map((row) => (
                                                                    <TableRow>
                                                                        <TableCell className="search-cell" align="center">{row}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </div>
                                            </div>
                                                <div className="col-lg-12">
                                                    <div className="float-child">
                                                        {this.state.Data && (
                                                            <div style={{ height: 800, width: '100%' }}>
                                                                <DataGrid id="JobTable" rows={this.state.Data} columns={jobColumns} pageSize={7} onCellClick={this.handleCellClick} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    {this.state.Data != 0 && (
                                                        <div className="float-child-job" id="JobForm">
                                                            <Card className="job-card">
                                                                <CardBody>
                                                                    {this.state.Job && (
                                                                        <div className="job-container">
                                                                            <div className="col-lg-12 logo-and-buttons ">
                                                                                {this.state.Job?.company_logo && (
                                                                                    <img className="company-logo col-lg-6" src={this.state.Job?.company_logo}></img>
                                                                                )}
                                                                                <button onClick={this.onJobDelete} className=" job-button col-lg-3">Remove Job</button>
                                                                                <div className="job-saved text-danger">{this.state.errors.jobAlreadySaved}</div>
                                                                            </div>
                                                                            <h3>{this.state.Job?.title}</h3>
                                                                            <h5>{this.state.Job?.company}</h5>
                                                                            <div>Located: {this.state.Job?.location}</div>
                                                                            <div>{this.state.Job?.type}</div>
                                                                            <a className="companny-url" href={this.state.Job?.company_url} target="_blank" rel="noopener noreferrer">Company's Website</a><br />
                                                                            <h5>How To Apply:</h5>
                                                                            <div>{this.state.Job?.how_to_apply.replace(/(<([^>]+)>)/ig, '')}</div><br />
                                                                            <h5>Job Description:</h5>
                                                                            <div>{this.state.Job?.description.replace(/(<([^>]+)>)/ig, '')}</div>
                                                                        </div>
                                                                    )}
                                                                 
                                                                </CardBody>
                                                            </Card>
                                                        </div>
                                                        )}
                                                        {this.state.Data == 0 && (
                                                            <div className="float-child-job" id="JobForm">
                                                                <Card className="job-card">
                                                                    <CardBody>
                                                                      <h3 align="center"> No jobs saved yet!</h3>
                                                                    </CardBody>
                                                                </Card>
                                                            </div>
                                                        )}
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
}
export default Profile;