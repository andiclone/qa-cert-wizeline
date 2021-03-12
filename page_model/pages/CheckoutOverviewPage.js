import { Selector } from 'testcafe';

class CheckoutOverviewPage {
    constructor () {
        this.pageTitle = Selector('.subheader').withText('Checkout: ');
        this.item1 = Selector('.inventory_item_name').nth(0);
        this.item2 = Selector('.inventory_item_name').nth(1);
    }
}

export default new CheckoutOverviewPage ();