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
    this.column = {
      '序號': true,
      '班別': false,
      '課程名稱(連結課程地圖)': true,
      '時間': true,
      '教室': false,
      '教師姓名*:主負責老師': false,
      '餘額': true, 
    };
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

  onUpdateColumn(column) {
    this.column[column] = !this.column[column];
  }
}

export default alt.createStore(HomeStore);
