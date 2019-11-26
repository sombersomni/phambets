import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
//components
import Login from './pages/Login';
import Bet from './pages/Bet';
import './App.css';
//Store
import { observer } from 'mobx-react';
import appUI from './stores/AppUI';
//Contexts
import UserContext from './contexts/UserContext';

function App() {
  const user = useContext(UserContext);
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
          <Redirect exact from="/" to="/login" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/bet" component={Bet} />
        </Switch>
      </Router>
    </div>
  );
}

export default observer(App);
