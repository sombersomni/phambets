import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
//components
import Login from './pages/Login';
import Bet from './pages/Bet';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Redirect to="/login" exact from="/"/>
          <Route exact path="/login" component={Login} />
          <Route exact  path="/bet" component={Bet} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
