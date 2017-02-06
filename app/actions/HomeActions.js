import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getDeptListSuccess',
      'getDeptListFail',
      'getCoursesSuccess',
      'getCoursesFail',
      'updateDepts',
      'updateColumn',
      'filterTime'
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
        console.log(jqXhr);
        this.actions.getCoursesFail("載入失敗，請重試");
      });
  }

}

export default alt.createActions(HomeActions);
