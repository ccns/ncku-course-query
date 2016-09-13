import alt from '../alt';

class NavbarActions {
  constructor() {
    this.generateActions(
      'getMenuSuccess',
      'getMenuFail'
    );
  }

  getMenu() {
    $.ajax({ url: '/api/menus' })
    .done((data) => {
      this.actions.getMenuSuccess(data)
    })
    .fail((jqXhr) => {
      this.actions.getMenuFail(jqXhr)
    });
  }
}

export default alt.createActions(NavbarActions);
