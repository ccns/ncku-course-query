import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getDeptListSuccess',
      'getDeptListFail',
      'getCoursesSuccess',
      'getCoursesFail',
      'updateDepts',
      'updateColumn'
    );
  }

  getDeptList() {
    $.ajax({ url: '/api/deptlist' })
      .done(data => {
        this.actions.getDeptListSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getDeptListFail(jqXhr);
      });
  }

  getCourses(dept) {
    dept = dept.split('=')[1];
    $.ajax({ url: '/api/course/' + dept })
      .done(data => {
        this.actions.getCoursesSuccess(data);
      })
      .fail(jqXhr => {
        this.actions.getCoursesFail(jqXhr);
      });
  }

}

export default alt.createActions(HomeActions);
