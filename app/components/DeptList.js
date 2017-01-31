import React from 'react';
import HomeActions from '../actions/HomeActions';

class DeptList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDeptClick(dept) {
    HomeActions.getCourses(dept);
  }

  render() {
    var deptList = this.props.depts.map(dept => {
      return (
        <li onClick={this.handleDeptClick.bind(this, dept.href)} className='list-group-item'>{dept.text}</li>
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
