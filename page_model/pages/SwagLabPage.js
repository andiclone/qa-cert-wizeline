import { Selector } from 'testcafe';

class SwagLabPage {
    constructor () {
        this.pageTitle = Selector('.app_logo');
        //this.addNoteItemButton = Selector('.btn.btn-primary');
        //this.noteItem = Selector('.list-group-item');
    }
}

export default new SwagLabPage ();