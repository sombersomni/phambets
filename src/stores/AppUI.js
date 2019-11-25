import { decorate, observable, action } from 'mobx';

class AppUI {
    constructor() {
        this.mobile = false;
    }
    setMobile(isMobile = false) {
        this.mobile = isMobile;
    }
}

decorate(AppUI, {
    mobile: observable,
    setMobile: action
})

export default new AppUI();