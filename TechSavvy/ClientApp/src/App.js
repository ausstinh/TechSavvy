import React from 'react';  
import './components/App.css';  
import Login from './components/Login';  
import Registration from './components/Registration';  
import Home from './components/Home';  
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';   
function App() {  
    //Router to navigate between login and register js pages
  return (  
    <Router>    
      <div className="container">    
        <nav className="navbar navbar-expand-lg navheader">    
          <div className="collapse navbar-collapse" >    
            <ul className="navbar-nav mr-auto">    
              <li className="nav-item">    
                <Link to={'/Login'} className="nav-link">Login</Link>    
              </li>    
              <li className="nav-item">    
                <Link to={'/Registration'} className="nav-link">Registration</Link>    
              </li>    
            </ul>    
          </div>    
        </nav> <br />    
        <Switch>    
          <Route exact path='/Login' component={Login} />    
          <Route path='/Registration' component={Registration} />    
        </Switch>    
        <Switch>  
        <Route path='/Home' component={Home} />    
        </Switch>  
      </div>    
    </Router>   
  );  
}  
export default App;