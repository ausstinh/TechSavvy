import React, { Component } from 'react';
import './App.css';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { DataGrid } from '@material-ui/data-grid';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
/*
* Constuctor for credential states (user, data (jobs), search key, errors)
*/
export class SearchJobs extends Component {
    constructor() {
        super();
        this.state = {
            User: this.props?.user,
            Data: '',
            Rows: [],
            SearchKey: '',
            errors: {
                noJobs: '',
                searchKey: '',
            }
        }
        this.state.User = sessionStorage.getItem("user");   
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);      
        this.state.Data = this?.Data?.bind(this);
        this.state.Rows = this?.Rows?.bind(this);
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
                    Rows: {
                        this.state.Data?.map((job) => {
                            
                        })
                    }
                })) 
                
                console.log(this.state.Data);
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
            axios.post('https://localhost:44383/api/job/SearchJobs', this.state.SearchKey, {
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
                   //not done yet
                }
            });
        }
    }
  static displayName = SearchJobs.name;
//Generated Landing Page
    render() {
        //check if user is authenticated
        //if not, redirect to login
        if (this.state?.User === null) {
            sessionStorage.removeItem("user");
            window.location = "/Login";
        }
        else {     
            var columns = [{ field: 'firstName', headerName: 'Results found: ', width: 300, sortable: false }];
            if (this.state.Data !== undefined) {
                 columns = [{ field: 'firstName', headerName: 'Results found: ' + this.state.Data?.length, width:300, sortable: false }];
            }
         
            const rows = [
                { id: 1, lastName: 'Snow', firstName:'', height: 100 },
                { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, height: 100  },
                { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, height: 100  },
                { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, height: 100 },
                { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, height: 100  },
                { id: 6, lastName: 'Melisandre', firstName: null, age: 150, height: 100  },
                { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, height: 100  },
                { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, height: 100  },
                { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, height: 100  },
            ];
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
                                                <div className="text-danger">{this.state.errors.searchKey}</div><br />
                                             </div>
                                         
                                            <div style={{ height: "790px", width: '45%' }}>
                                            
                                                <DataGrid rows={this.state.Data} columns={columns} pageSize={10} disableColumnFilter={true} autoPageSize={true}/>
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