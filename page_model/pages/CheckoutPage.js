import { Selector, t } from 'testcafe';

class CheckoutPage {
    constructor () {
        this.pageTitle = Selector('.subheader').withText('Checkout: ');
        this.firstName = Selector('#first-name');
        this.lastName = Selector('#last-name');
        this.zipCode = Selector('#postal-code');
        this.continueButton = Selector('.btn_primary.cart_button');
    }

    async fillCheckoutForm(firstName, lastName, zipCode) {
        await t
            .typeText(this.firstName, firstName)
            .typeText(this.lastName, lastName)
            .typeText(this.zipCode, zipCode)
            .click(this.continueButton)
    }
}

export default new CheckoutPage ();