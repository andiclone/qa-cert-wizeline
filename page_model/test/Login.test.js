import LoginPage from '../pages/LoginPage';
import SwagLabPage from '../pages/SwagLabPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage';
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

test.skip('Users can add an item to Shopping Cart', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD);
    await SwagLabPage.addToCart();

    await t.expect(SwagLabPage.cartCounter.exists).ok();
});

test.skip('Users can add multiple items to Shopping Cart', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD);
    await SwagLabPage.addToCart();

    await t.expect(SwagLabPage.cartCounter.exists).ok();
});

test.skip('Users can continue with missing mail information', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD);
    await SwagLabPage.addToCart();

    await t.expect(CartPage.pageTitle.exists).ok();
});

test.only('Users can fill info for Checkout', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD);
    //await SwagLabPage.addToCart();
    await SwagLabPage.navigateCart();
    await CartPage.submitCheckout();
    await CheckoutPage.fillCheckoutForm(CREDENTIALS.VALID_ADDRESS.FIRST_NAME, CREDENTIALS.VALID_ADDRESS.LAST_NAME, CREDENTIALS.VALID_ADDRESS.ZIP_CODE);

    await t.expect(CheckoutOverviewPage.pageTitle.exists).ok();
});