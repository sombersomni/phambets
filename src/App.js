import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
//components
import Login from './pages/Login';
import Bet from './pages/Bet';
import './App.css';
//Store
import { observer } from 'mobx-react';
import appUI from './stores/AppUI';

function App() {
  function handleResize() {
    if (window.innerWidth > 600) {
      appUI.setMobile(false);
    } else {
      appUI.setMobile(true);
    }
  }
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);
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

export default observer(App);
