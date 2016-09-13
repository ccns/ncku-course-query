import alt from '../alt';
import NavbarActions from '../actions/NavbarActions';

class NavbarStore {
  constructor() {
    this.bindActions(NavbarActions);
    this.menus = [];
    this.relatedLinks = [];
  }

  onGetMenuSuccess(content) {
    this.menus = content.menu;
    this.relatedLinks = content.relatedLink;
  }

  onGetMenuFail(jqXhr) {
    toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  }
}

export default alt.createStore(NavbarStore);
