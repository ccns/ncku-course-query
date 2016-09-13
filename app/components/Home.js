import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import {first, without, findWhere} from 'underscore';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
    HomeActions.getDeptList();
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleCollegeClick(college) {
    HomeActions.updateDepts(college);
  }

  handleDeptClick(dept) {
    HomeActions.getCourses(dept);
  }

  render() {
    var collegeList = this.state.colleges.map(college => {
      return (
        <li onClick={this.handleCollegeClick.bind(this, college)}>{college}</li>
      );
    });

    var deptList = this.state.depts.map(dept => {
      return (
        <li onClick={this.handleDeptClick.bind(this, dept.href)}>{dept.text}</li>
      );
    });

    var courseList = this.state.courses.map(course => {
      return (
        <li>{course['課程名稱(連結課程地圖)'].text}</li>
      );
    });

    return (
      <div className='container'>
        <div className=''>
          <ul>
            {collegeList}
          </ul>
        </div>
        <div className=''>
          <ul>
            {deptList}
          </ul>
        </div>
        <div className=''>
          <ul>
            {courseList}
          </ul>
        </div>
      </div>
    );
  }
}

export default Home;
