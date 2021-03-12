import { Selector } from 'testcafe';

class CheckoutOverviewPage {
    constructor () {
        this.pageTitle = Selector('.subheader').withText('Checkout: ');
    }
}

export default new CheckoutOverviewPage ();