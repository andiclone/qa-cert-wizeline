import { Selector, t } from 'testcafe';

class LoginPage {
    constructor () {
        this.userNameField = Selector('#user-name');
        this.userPasswordField = Selector('#password');
        this.userLoginButton = Selector('#login-button');
        this.userErrorMessage = Selector('h3').withText('Epic sadface: ');
    }

    async submitLoginForm(username, password) {
        await t
            .typeText(this.userNameField, username)
            .typeText(this.userPasswordField, password)
            .click(this.userLoginButton)
    }
}

export default new LoginPage ();