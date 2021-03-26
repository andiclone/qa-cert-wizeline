import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage';
import FinishedPage from '../pages/FinishedPage';
import LoginPage from '../pages/LoginPage';
import SwagLabPage from '../pages/SwagLabPage';
import { CREDENTIALS } from '../data/Constants';
import { standardUser } from '../user/User';

fixture('Shopping cart testing')
    .beforeEach(async t => {
        await t
            .useRole(standardUser)
    });

test('Users can go to Shopping Cart', async t => {
    await SwagLabPage.navigateCart();

    await t.expect(CartPage.pageTitle.exists).ok();
});

test('Users can add an item to Shopping Cart', async t => {
    await SwagLabPage.addToCart();

    await t.expect(SwagLabPage.cartCounter.integerSpanValue).eql(1);
});

test('Users can add 2 items to Shopping Cart', async t => {
    await SwagLabPage.addToCartMultiple();

    await t.expect(SwagLabPage.cartCounter.integerSpanValue).eql(2);
});

test('Users cannot continue with missing information', async t => {
    await SwagLabPage.addToCart();
    await SwagLabPage.navigateCart();
    await CartPage.submitCheckout();
    await t.click(CheckoutPage.continueButton);

    await t.expect(CheckoutPage.errorText.exists).ok();
});

test('Users can fill info for Checkout', async t => {
    await SwagLabPage.addToCart();
    await SwagLabPage.navigateCart();
    await CartPage.submitCheckout();
    await CheckoutPage.fillCheckoutForm(CREDENTIALS.VALID_ADDRESS.FIRST_NAME, CREDENTIALS.VALID_ADDRESS.LAST_NAME, CREDENTIALS.VALID_ADDRESS.ZIP_CODE);

    await t.expect(CheckoutOverviewPage.pageTitle.exists).ok();
});

test('Users can review ordered items', async t => {
    await SwagLabPage.addToCartMultiple();
    await SwagLabPage.navigateCart();
    await CartPage.submitCheckout();
    await CheckoutPage.fillCheckoutForm(CREDENTIALS.VALID_ADDRESS.FIRST_NAME, CREDENTIALS.VALID_ADDRESS.LAST_NAME, CREDENTIALS.VALID_ADDRESS.ZIP_CODE);

    await t.expect(CheckoutOverviewPage.item1.innerText).eql('Sauce Labs Backpack');
    await t.expect(CheckoutOverviewPage.item2.innerText).eql('Sauce Labs Bike Light');
});

test('Users can checkout to finalize order', async t => {
    await SwagLabPage.addToCartMultiple();
    await SwagLabPage.navigateCart();
    await CartPage.submitCheckout();
    await CheckoutPage.fillCheckoutForm(CREDENTIALS.VALID_ADDRESS.FIRST_NAME, CREDENTIALS.VALID_ADDRESS.LAST_NAME, CREDENTIALS.VALID_ADDRESS.ZIP_CODE);
    await t.click(CheckoutOverviewPage.finishButton);

    await t.expect(FinishedPage.pageTitle.innerText).eql('THANK YOU FOR YOUR ORDER');
});