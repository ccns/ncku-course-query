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
    var code_bool = {};
    if(dept)
      bool.must = {match: {dept_no: dept}};
    code_bool.must = [];
    code_bool.must.push({match: {dept_no: {query: q, boost: 1}}});
    code_bool.must.push({match: {course_no: {query: q, boost: 1}}});
    bool.should = [];
    bool.should.push({bool: code_bool});
    bool.should.push({match: {name: {query: q, boost: 4}}});
    bool.should.push({match: {teacher: {query: q, boost: 2}}});
    bool.should.push({match: {required: {query: q, boost: 1}}});
    query.bool = bool;
    obj.query = query;
    obj.size = 50;
    // console.log(JSON.stringify(obj));
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
