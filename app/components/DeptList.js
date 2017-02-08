import React from 'react';
import HomeActions from '../actions/HomeActions';

class DeptList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDeptClick(dept) {
    dept = dept.split('=')[1];
    HomeActions.updateDeptSelected(dept);
    HomeActions.getCourses(dept);
    if ($(window).width() < 992) {
      $('html, body').animate({
        scrollTop: $("#course-container").offset().top
      }, 500);
    }
  }

  render() {
    var deptList = this.props.depts.map((dept, index) => {
      return (
        <li onClick={this.handleDeptClick.bind(this, dept.href)} className='list-group-item' key={index}>{dept.text}</li>
      );
    });

    return (
      <ul className='list-group'>
        {deptList}
      </ul>
    );
  }
}

export default DeptList;
