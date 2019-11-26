import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';
//components
import Login from './pages/Login';
import Bet from './pages/Bet';
import SignUp from './pages/SignUp';
import Navigation from './components/Navigation';
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

  async function authenticateUser() {
    if (window.sessionStorage) {
      const token = window.sessionStorage.getItem('token');
      console.log(token, 'token');
      try {
        const url = window.APP_ENV === 'development' ? 'http://localhost:8080/' : '/';
        const response = await axios.post(url, { token });
        if (response.status === 200) {
          const { id, username } = response.data;
          console.log('authenticating');
          user.login(id, username, token);
          console.log(user.loggedIn);
        }
      } catch(err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    authenticateUser();
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Redirect to={user.loggedIn ? '/bet' : '/login'} />
        <Navigation />
        <Switch>
          <Redirect exact from="/" to={user.loggedIn ? '/bet' : '/login'} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/bet" component={Bet} />
        </Switch>
      </Router>
    </div>
  );
}

export default observer(App);
