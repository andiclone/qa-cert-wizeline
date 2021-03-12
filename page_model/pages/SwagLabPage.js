import { Selector, t } from 'testcafe';

class SwagLabPage {
    constructor () {
        this.pageTitle = Selector('.app_logo');
        this.burgerMenu = Selector('#react-burger-menu-btn');
        this.logoutButton = Selector('#logout_sidebar_link');
        this.cartButton = Selector('.shopping_cart_link');
        this.addCartButton = Selector('.pricebar').nth(0).child('.btn_primary.btn_inventory');
        this.addCartButton2 = Selector('.pricebar').nth(1).child('.btn_primary.btn_inventory');
        this.cartCounter = Selector('.fa-layers-counter.shopping_cart_badge').addCustomDOMProperties({
            integerSpanValue: el => parseInt(el.innerText, 10)
        });
;
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

    async addToCartMultiple() {
        await t
            .click(this.addCartButton)
            .click(this.addCartButton2)
    }
}

export default new SwagLabPage ();