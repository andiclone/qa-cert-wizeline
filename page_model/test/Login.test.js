import LoginPage from '../pages/LoginPage';
import SwagLabPage from '../pages/SwagLabPage';
import { CREDENTIALS } from '../data/Constants';

fixture('Login feature testing')
    .page `https://www.saucedemo.com/`;

//test.skip and test.only to change which tests are run
test('Users can login user valid credentials', async t => {
    console.log('credentials user: ', CREDENTIALS.VALID_USER.USERNAME);
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD);

    await t.expect(SwagLabPage.pageTitle.exists).ok();
});

test('Users cannot login user valid credentials', async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.INVALID_USER.USERNAME, CREDENTIALS.INVALID_USER.PASSWORD);

    await t.expect(LoginPage.userErrorMessage.exists).ok()
    await t.expect(LoginPage.userErrorMessage.innerText).eql('Epic sadface: Username and password do not match any user in this service')
});
