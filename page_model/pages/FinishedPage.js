import { Selector } from 'testcafe';

class FinishedPage {
    constructor () {
        this.pageTitle = Selector('.complete-header');
    }
}

export default new FinishedPage ();