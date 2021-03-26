import { Role } from 'testcafe';
import LoginPage from '../pages/LoginPage'
import { CREDENTIALS } from '../data/Constants'

const AppURL = 'https://www.saucedemo.com/'

export const standardUser = Role(AppURL, async t => {
    await LoginPage.submitLoginForm(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
}, { preserveUrl: true });