import { Selector, t } from 'testcafe';

class SwagLabPage {
    constructor () {
        this.pageTitle = Selector('.app_logo');
        this.burgerMenu = Selector('#react-burger-menu-btn');
        this.logoutButton = Selector('#logout_sidebar_link');
        this.cartButton = Selector('.shopping_cart_link');
        this.addCartButton = Selector('#item_4_title_link').parent('.btn_primary.btn_inventory');
        this.removeCartButton = Selector('#item_4_title_link').parent('.btn_secondary.btn_inventory');
        this.cartCounter = Selector('.fa-layers-counter.shopping_cart_badge');
    }

    async submitLogout() {
        await t
            .click(this.burgerMenu)
            .click(this.logoutButton)
    }

    async navigateCart() {
        await t
            .click(this.cartButton)
    }

    async addToCart() {
        await t
            .click(this.addCartButton)
    }
}

export default new SwagLabPage ();