import { decorate, observable, action } from 'mobx';

class User {
    constructor() {
        this.username = '';
        this.loggedIn = false;
    }
    
    login() {
        this.loggedIn = true;
    }
    logout() {
        this.loggedIn = false;
    }
}

decorate(User, {
    username: observable,
    loggedIn: observable,
    login: action,
    logout: action
})

export default new User();