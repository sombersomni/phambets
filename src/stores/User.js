import { decorate, observable, action } from 'mobx';

class User {
    constructor() {
        this.id = '';
        this.username = '';
        this.token = '';
        this.loggedIn = false;
    }
    
    login(id, username, token) {
        this.loggedIn = true;
        this.id = id;
        this.username = username;
        this.token = token;
    }
    logout() {
        this.loggedIn = false;
    }
}

decorate(User, {
    id: observable,
    token: observable,
    username: observable,
    loggedIn: observable,
    login: action,
    logout: action
})

export default new User();