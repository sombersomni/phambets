import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//Stores
import user from './stores/User';
//Contexts
import UserContext from './contexts/UserContext';

const MainApp = () => (
    <UserContext.Provider value={user}>
        <App />
    </UserContext.Provider>
)

ReactDOM.render(<MainApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
