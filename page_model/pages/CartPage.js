import { Selector, t } from 'testcafe';

class CartPage {
    constructor () {
        this.pageTitle = Selector('#cart_contents_container');
        this.checkoutButton = Selector('.btn_action.checkout_button');
    }

    async submitCheckout() {
        await t
            .click(this.checkoutButton)
    }
}

export default new CartPage ();