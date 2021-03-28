import React, { Component } from 'react';
import './App.css';
import { Card, CardBody, CardGroup, Col, Container, Input, InputGroup, Row } from 'reactstrap';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { DataGrid } from '@material-ui/data-grid';

/*
* Constuctor for credential states (user, data (jobs), search key, errors)
*/
export class SearchJobs extends Component {
    constructor() {
        super();
        this.state = {
            User: this.props?.user,
            Data: '',
            Job: {
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
                created_at:'',
                users_id:''
            },
            SearchKey: '',
            errors: {
                noJobs: '',
                searchKey: '',
                JobAlreadySaved:'',
            }
        }
        this.state.Data = this?.Data?.bind(this);
        this.state.Job = this?.Job?.bind(this);
        this.state.Rows = this?.Rows?.bind(this);
        this.state.User = sessionStorage.getItem("user");   
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onJobSave = this.onJobSave.bind(this);
        this.SelectFirstCell = this.SelectFirstCell.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);      
        this.handleCellClick = this.handleCellClick.bind(this);                            
    }
    /* Retrieve 50 most recent jobs from REST API
    *@param none
    * return json array of jobs data
    */
    componentDidMount() {
        axios.get('https://localhost:44383/api/job/RetrieveJobs', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.data.status === "invalid") {
                this.setState(prevstate => ({
                    errors: {
                        ...prevstate.errors,
                        noJobs: 'No jobs found!',
                    },
                }));
            }
            else {
                this.setState(prevState => ({
                    Data: res.data.jobs.result,  
                })) 
           
            }
        });
        
    }
     /**
     * on Data grid render auto select first row and view job details
     */
    SelectFirstCell() {
        var myTable = document.getElementsByClassName('MuiDataGrid-cell');
        var row = myTable[0];
        if (row != undefined) {
            row.click();
        }
    }
    /**
     * get current job state and send it to back-end to save as a user's job in the database
     * returns status code and message
     */
    onJobSave() {
        var user = JSON.parse(sessionStorage.getItem('user'));
        var job = JSON.stringify({
            id : this.state.Job?.id,
            title : this.state.Job?.title,
            type : this.state.Job?.type,
            description : this.state.Job?.description,
            company : this.state.Job?.company,
            company_url : this.state.Job?.company_url,
            url :this.state.Job?.url,
            location : this.state.Job?.location,
            how_to_apply : this.state.Job?.how_to_apply,
            company_logo :this.state.Job?.company_logo,
            created_at :this.state.Job?.created_at,
            users_id : user["id"]
        });

        axios.post('https://localhost:44383/api/job/SaveJob', job, {
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
                        jobAlreadySaved: 'Job has been saved',
                    },
                }));
            }
        });
    }
  /*on change method to update state of search key 
   * @param searh form inpute value
   */
    onSearchChange(e) {
        const value = e.target.value;
        this.setState(prevState => ({
            SearchKey: value,   
        }))            
    }
   
    /*submit method to retrieve jobs from search key
     * @param state.SearchKey
     * return json array of jobs data related to search key
     */
    onSearchClick() {
        //check if state is null
        if (this.state.SearchKey === '')
        {
            this.setState(prevstate => ({
                errors: {
                    ...prevstate.errors,
                    searchKey: 'Search cannot be empty!',
                },
            }));
        }
        else
        {      
            var searchKey = JSON.stringify({
                Key: this.state.SearchKey, 
                User: JSON.parse(sessionStorage.getItem('user')),
            });

            axios.post('https://localhost:44383/api/job/SearchJobs', searchKey, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.data.status === "invalid") {
                    this.setState(prevstate => ({
                        errors: {
                            ...prevstate.errors,
                            noJobs: 'No jobs have been found...',
                        },
                    }));
                }
                else {  
                    this.setState(prevState => ({
                        Data: res.data.jobs.result,
                    }))
                    sessionStorage.removeItem("user");
                    sessionStorage.setItem('user', JSON.stringify(res.data.user));       
                    this.forceUpdate();
                    
                    var myTable = document.getElementsByClassName('MuiDataGrid-cell');
                    var row = myTable[0];            
                    row.click();                
                }
            });
        }
    }
  /**
   * on row click set job state from row data (row contains job details)
   * @param {any} e
   */
    handleCellClick(e) {
        this.setState(prevstate => ({
            Job: e.row,
            errors: {
                ...prevstate.errors,
                jobAlreadySaved: '',
            },
        }));
    }
  static displayName = SearchJobs.name;
//Generated Search Jobs Page

    render() {
        //check if user is authenticated
        //if not, redirect to login
        if (this.state?.User === null) {
            sessionStorage.removeItem("user");
            window.location = "/Login";
        }
        else {     
              //create job column to view job titles
            var columns = [{ field: 'title', headerName: 'Results found: ', width: 300, sortable: false }];
            if (this.state.Data !== undefined) {
                columns = [{ field: 'title', headerName: 'Results found: ' + this.state.Data?.length, width: 300, sortable: false }];
              
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
                                                <InputGroup className="mb-3">
                                                    <Input type="text" name="search" onChange={this.onSearchChange} placeholder="Enter a title, location, description" />
                                                    <button
                                                        className="react-search-field-button"
                                                        type="button"
                                                        onClick={this.onSearchClick}
                                                    >
                                                        <FaSearch />
                                                    </button>
                                                </InputGroup>        
                                                <div className="text-danger">{this.state.errors.searchKey}</div>
                                            </div>
                                            <div>
                                                <div className="float-child">                                                  
                                                    {this.state.Data && (
                                                        <div style={{ height: 800, width: '100%' }}>
                                                            <DataGrid id="JobTable" rows={this.state.Data} columns={columns} pageSize={7} onStateChange={ this.SelectFirstCell } onCellClick={this.handleCellClick} />
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
                                                                <div>{this.state.Job?.created_at}</div>
                                                                <div>Located: {this.state.Job?.location}</div>
                                                                <div>{this.state.Job?.type}</div>                                                           
                                                                        <a className="companny-url" href={this.state.Job?.company_url} target="_blank" rel="noopener noreferrer">Company's Website</a><br/>
                                                                <h5>How To Apply:</h5>
                                                                <div>{this.state.Job?.how_to_apply.replace( /(<([^>]+)>)/ig, '')}</div><br/>
                                                                <h5>Job Description:</h5>
                                                                <div>{this.state.Job?.description.replace( /(<([^>]+)>)/ig, '')}</div>
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
export default SearchJobs;