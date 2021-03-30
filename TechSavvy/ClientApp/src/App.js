import React, {  } from 'react'; 

import './components/App.css';  
import './custom.css';  
import Login from './components/Login';  
import Registration from './components/Registration';  
import SearchJobs from './components/SearchJobs';  
import FindEmail from './components/FindEmail';
import Profile from './components/Profile';
import ManageUsers from './components/ManageUsers';  
import ResetPassword from './components/ResetPassword';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
function App() {   
    var user = JSON.parse(sessionStorage.getItem('user'));
    //Router to navigate between login and register js pages
  return (  
    <Router>    
          <div className="container">
              <AppBar style={{ backgroundColor:"#007bff"}} position="static">
                  <Toolbar>
                      {user?.administartorRole === 1 && user !== null ? (
                          <div>
                              <Button>
                                  <Link to={'/Profile'} className="nav-link">{user?.username + "'s Profile"}</Link>
                              </Button>
                              <Button className="nav-item">
                                  <Link to={'/SearchJobs'} className="nav-link">Search Jobs</Link>
                              </Button>
                              <Button className="nav-item">
                                  <Link to={'/ManageUsers'} className="nav-link">Manage Users</Link>
                              </Button>
                              <Button className="nav-item">
                                  <Link onClick={Logout} className="nav-link">Logout</Link>
                              </Button>
                          </div>
                      ) : (
                      user?.id !== -1 && user !== null ? (
                       <div>
                         <Button>
                             <Link to={'/Profile'} className="nav-link">{user?.username + "'s Profile"}</Link>
                          </Button>
                          <Button className="nav-item">
                             <Link to={'/SearchJobs'} className="nav-link">Search Jobs</Link>
                          </Button>
                          <Button className="nav-item">
                             <Link onClick={Logout} className="nav-link">Logout</Link>
                          </Button>
                       </div>
                      ) : (
                          <div> 
                            <Button>
                               <Link to={'/Login'} className="nav-link">Login</Link>
                            </Button>
                            <Button >
                               <Link to={'/Registration'} className="nav-link">Registration</Link>
                            </Button>
                          </div>
                          ))}
                  </Toolbar>
              </AppBar>
              <Switch>                  
        <Route path='/Login'  >
            <Login user={user}  />
        </Route>    
        <Route path='/Registration'  >
            <Registration user={user}  />
        </Route>  
       <Route path='/FindEmail'  >
            <FindEmail user={user}  />
        </Route>  
          <Route path='/ResetPassword'  >
            <ResetPassword user={user}  />
        </Route>  
        </Switch>    
        <Switch>  
        <Route path='/SearchJobs'> <SearchJobs user={user}  />
        </Route>
        <Route path='/Profile'> <Profile user={user} />
        </Route>
        <Route path='/ManageUsers'> <ManageUsers user={user} />
        </Route>
        </Switch>  
      </div>    
    </Router>   
    ); 
    function Logout() {    
        sessionStorage.removeItem("user");
        window.location = "/Login";
    }
}  

export default App;