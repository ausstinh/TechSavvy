import React, { Component } from 'react';
import './App.css';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
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
            const data = this.state.Data;
            console.log(data);
            let rows = data;
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
                                         
                                            <Paper >
                                                <Table  aria-label="simple table">  
                                                    <TableBody>
                                                        {rows?.map(row => (
                                                            <TableRow key={row.title}>
                                                                <TableCell component="th" scope="row">
                                                                    {row.title}
                                                                </TableCell>    
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </Paper>
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