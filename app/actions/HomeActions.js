import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'getDeptListSuccess',
      'getDeptListFail',
      'getCoursesSuccess',
      'getCoursesFail',
      'searchSuccess',
      'searchFail',
      'updateDeptSelected',
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
    $.ajax({ url: '/api/course/' + dept })
      .done(data => {
        this.actions.getCoursesSuccess(data);
      })
      .fail(jqXhr => {
        console.log(jqXhr);
        this.actions.getCoursesFail("載入失敗，請重試");
      });
  }

  search(q, dept) {
    var obj = {};
    var query = {};
    var bool = {};
    if(dept)
      bool.must = {match: {dept_no: dept}};
    bool.should = [];
    bool.should.push({match: {dept_no: q}});
    bool.should.push({match: {course_no: q}});
    bool.should.push({match: {name: q}});
    bool.should.push({match: {teacher: q}});
    bool.should.push({match: {required: q}});
    bool.should.push({match: {memo: q}});
    query.bool = bool;
    obj.query = query;
    console.log(JSON.stringify(obj));
    $.ajax({
      url: '/api/search',
      method: "POST",
      data: JSON.stringify(obj),
      contentType: 'application/json; charset=utf-8',
    }).done(data => {
        this.actions.searchSuccess(data);
      })
      .fail(jqXhr => {
        console.log(jqXhr);
        this.actions.searchFail("載入失敗，請重試");
      });
  }
}

export default alt.createActions(HomeActions);
