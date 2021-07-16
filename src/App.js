import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './App.css';
import timezone from './components/timezone';
import Navigation from './components/navigation';
import login from './components/myLogin';
import {Provider} from 'react-redux';
import store from './redux/store';
import home from './components/home';
import list from './components/list';
import SecureRoute from './components/secureRoute';

function App() {
  return (
    <Provider store={store}>
      <div className="App">      
            <Router>
              <Navigation/>  
              <div className="container">
                <Route exact path="/" component={home}/>                                    
                <Route exact path="/time" component={timezone}/>                                
                <Route exact path="/login" component={login}/>                                
                <SecureRoute exact path="/list" component={list}/>                                
              </div>                              
            </Router>  
      </div>
    </Provider>
  );
}

export default App;
