import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
    this.deptList = {};
    this.colleges = [];
    this.depts = [];
    this.courses = [];
    this.courses_all = [];
    this.times = {};
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
    this.courses_all = data;
    this.updateCourses();
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

  onFilterTime(time) {
    if(this.times[time])
      delete this.times[time];
    else
      this.times[time] = true;
    console.log(this.times);
    this.updateCourses();
  }

  updateCourses() {
    this.courses = this.courses_all.map(course => {
      if(!Object.keys(this.times).length) course.hide = false;
      else {
        var find = false;
        var time = course.time.split(",");
        if(time)
          for(var t = 0; t < time.length; t++)
            if(this.times[time[t]]) find = true;
        course.hide = !find;
      }
      return course;
    })
  }
}

export default alt.createStore(HomeStore);
