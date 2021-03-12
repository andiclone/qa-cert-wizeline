import LoginPage from '../pages/LoginPage';
import SwagLabPage from '../pages/SwagLabPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage';
import FinishedPage from '../pages/FinishedPage';
import { CREDENTIALS } from '../data/Constants';

fixture('Login feature testing')
    .page `https://www.saucedemo.com/`;

//test.skip and test.only to change which tests are run
test('Users can login user valid credentials', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD);

    await t.expect(SwagLabPage.pageTitle.exists).ok();
});

test('Users cannot login user valid credentials', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.INVALID_USER.USERNAME, CREDENTIALS.INVALID_USER.PASSWORD);

    await t.expect(LoginPage.userErrorMessage.exists).ok()
    await t.expect(LoginPage.userErrorMessage.innerText).eql('Epic sadface: Username and password do not match any user in this service')
});

test('Users can logout', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD);
    await SwagLabPage.submitLogout();

    await t.expect(LoginPage.pageTitle.exists).ok();
});

test('Users can go to Shopping Cart', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD);
    await SwagLabPage.navigateCart();

    await t.expect(CartPage.pageTitle.exists).ok();
});

test('Users can add an item to Shopping Cart', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD);
    await SwagLabPage.addToCart();

    await t.expect(SwagLabPage.cartCounter.integerSpanValue).eql(1);
});

test('Users can add 2 items to Shopping Cart', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD);
    await SwagLabPage.addToCartMultiple();

    await t.expect(SwagLabPage.cartCounter.integerSpanValue).eql(2);
});

test('Users cannot continue with missing information', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD);
    await SwagLabPage.addToCart();
    await SwagLabPage.navigateCart();
    await CartPage.submitCheckout();
    await t.click(CheckoutPage.continueButton);

    await t.expect(CheckoutPage.errorText.exists).ok();
});

test('Users can fill info for Checkout', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD);
    await SwagLabPage.addToCart();
    await SwagLabPage.navigateCart();
    await CartPage.submitCheckout();
    await CheckoutPage.fillCheckoutForm(CREDENTIALS.VALID_ADDRESS.FIRST_NAME, CREDENTIALS.VALID_ADDRESS.LAST_NAME, CREDENTIALS.VALID_ADDRESS.ZIP_CODE);

    await t.expect(CheckoutOverviewPage.pageTitle.exists).ok();
});

test('Users can review ordered items', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD);
    await SwagLabPage.addToCartMultiple();
    await SwagLabPage.navigateCart();
    await CartPage.submitCheckout();
    await CheckoutPage.fillCheckoutForm(CREDENTIALS.VALID_ADDRESS.FIRST_NAME, CREDENTIALS.VALID_ADDRESS.LAST_NAME, CREDENTIALS.VALID_ADDRESS.ZIP_CODE);

    await t.expect(CheckoutOverviewPage.item1.innerText).eql('Sauce Labs Backpack');
    await t.expect(CheckoutOverviewPage.item2.innerText).eql('Sauce Labs Bike Light');
});

test('Users can checkout to finalize order', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD);
    await SwagLabPage.addToCartMultiple();
    await SwagLabPage.navigateCart();
    await CartPage.submitCheckout();
    await CheckoutPage.fillCheckoutForm(CREDENTIALS.VALID_ADDRESS.FIRST_NAME, CREDENTIALS.VALID_ADDRESS.LAST_NAME, CREDENTIALS.VALID_ADDRESS.ZIP_CODE);
    await t.click(CheckoutOverviewPage.finishButton);

    await t.expect(FinishedPage.pageTitle.innerText).eql('THANK YOU FOR YOUR ORDER');
});