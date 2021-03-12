import { Selector, t } from 'testcafe';

class SwagLabPage {
    constructor () {
        this.pageTitle = Selector('.app_logo');
        this.burgerMenu = Selector('#react-burger-menu-btn');
        this.logoutButton = Selector('#logout_sidebar_link');
    }

    async submitLogout() {
        await t
            .click(this.burgerMenu)
            .click(this.logoutButton)
    }
}

export default new SwagLabPage ();