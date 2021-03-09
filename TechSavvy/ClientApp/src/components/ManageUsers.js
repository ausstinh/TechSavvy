import React, { Component } from 'react';
import './App.css';
import { Card, CardBody, CardGroup, Col, Container, Row } from 'reactstrap';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';

/*
* Constuctor for Manger User states (user, data (users), , errors)
*/
export class ManageUsers extends Component {
    constructor() {
        super();
        this.state = {
            User: this.props?.user,
            Data: '',           
            errors: {
                noUsers: '',                           
            }
        }
        this.state.Data = this?.Data?.bind(this);    
        this.state.Rows = this?.Rows?.bind(this);
        this.state.User = JSON.parse(sessionStorage.getItem('user'));
    }
    /* Retrieve all users from database
    *@param none
    * return array of users
    */
    //componentDidMount() {
    //    var user = JSON.parse(sessionStorage.getItem('user'));
    //    axios.get('https://localhost:44383/api/job/RetrieveUserJobs', user, {
    //        headers: {
    //            'Content-Type': 'application/json'
    //        }
    //    }).then(res => {
    //        if (res.data.status === "invalid") {
    //            this.setState(prevstate => ({
    //                errors: {
    //                    ...prevstate.errors,
    //                    noUsers: 'No Users found!',
    //                },
    //            }));
    //        }
    //        else {
    //            this.setState(prevState => ({
    //                Data: res.data.jobs.result,
    //            }))

    //        }
    //    });

    //}
    //onJobDelete(e) {
    //    var user = JSON.parse(sessionStorage.getItem('user'));
    //    console.log(user["id"]);
    //    var job = JSON.stringify({
    //        id: this.state.Job?.id,
    //        title: this.state.Job?.title,
    //        type: this.state.Job?.type,
    //        description: this.state.Job?.description,
    //        company: this.state.Job?.company,
    //        company_url: this.state.Job?.company_url,
    //        url: this.state.Job?.url,
    //        location: this.state.Job?.location,
    //        how_to_apply: this.state.Job?.how_to_apply,
    //        company_logo: this.state.Job?.company_logo,
    //        created_at: this.state.Job?.created_at,
    //        users_id: user["id"]
    //    });

    //    axios.post('https://localhost:44383/api/job/DeleteJob', job, {
    //        headers: {
    //            'Content-Type': 'application/json'
    //        }
    //    }).then(res => {
    //        if (res.data.status === "invalid") {
    //            this.setState(prevstate => ({
    //                errors: {
    //                    ...prevstate.errors,
    //                    jobAlreadySaved: res.data.message,
    //                },
    //            }));
    //        }
    //        else {
    //            this.setState(prevstate => ({
    //                errors: {
    //                    ...prevstate.errors,
    //                    jobAlreadySaved: 'Job has been deleted from your profile',
    //                },
    //            }));
    //        }
    //    });
    //}


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
            //create job column to view job titles
            var jobColumns = [{ field: 'title', headerName: 'Your Jobs: ', width: 300, sortable: false }];
            if (this.state.Data !== undefined) {
                jobColumns = [{ field: 'title', headerName: 'Your Jobs: ' + this.state.Data?.length, width: 300, sortable: false }];
            } 
            //use Data Grid to display column and rows of job titles. Selecting a row displays the job detials on a Card 
            return (
                <div className="app flex-row align-items-center">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="12" lg="12" xl="12">
                                <CardGroup>
                                    <Card className="p-2 search-table">
                                        <CardBody>
                                            <div className="text-danger">{this.state.errors.noJobs}</div>
                                            <div>                                             
                                                <div className="float-child">
                                                    {this.state.Data && (
                                                        <div style={{ height: 400, width: '100%' }}>                                                        
                                                            <DataGrid id="JobTable" rows={this.state.Data} columns={jobColumns} pageSize={7} onStateChange={this.SelectFirstCell} onCellClick={this.handleCellClick} />
                                                        </div>
                                                    )}
                                                </div>
                                                {this.state.Data && (
                                                    <div className="float-child-job" id="JobForm">
                                                        <Card className="job-card">
                                                            <CardBody>
                                                                {this.state.Job && (
                                                                    <div className="job-container">
                                                                        <div className="col-lg-12 logo-and-buttons ">
                                                                            {this.state.Job?.company_logo && (
                                                                                <img className="company-logo col-lg-6" src={this.state.Job?.company_logo}></img>
                                                                            )}
                                                                            <button onClick={this.onJobSave} className=" job-button col-lg-3">Save Job</button>
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
export default ManageUsers;