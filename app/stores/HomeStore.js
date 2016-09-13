import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.deptList = {};
    this.colleges = [];
    this.depts = [];
    this.courses = [];
    this.header = [];
  }

  onGetDeptListSuccess(data) {
    this.deptList = data;
    this.colleges = data.colleges;
  }

  onGetDeptListFail(errorMessage) {
    toastr.error(errorMessage);
  }

  onGetCoursesSuccess(data) {
    this.header = data.header;
    this.courses = data.courses;
  }

  onGetCoursesFail(errorMessage) {
    toastr.error(errorMessage);
  }

  onUpdateDepts(college) {
    this.depts = this.deptList.depts[college];
  }
}

export default alt.createStore(HomeStore);
