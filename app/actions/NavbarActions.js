import alt from '../alt';

class NavbarActions {
  constructor() {
    this.generateActions(
      'updateAjaxAnimation',
      'getMenuSuccess',
      'getMenuFail'
    );
  }

  getLinks() {
    $.ajax({ url: '/api/links' })
    .done((data) => {
      this.actions.getMenuSuccess(data)
    })
    .fail((jqXhr) => {
      this.actions.getMenuFail(jqXhr)
    });
  }
}

export default alt.createActions(NavbarActions);
