import React from 'react';
import HomeActions from '../actions/HomeActions';

class CourseList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var courseList = this.props.courses.map(course => {
      return (
        <li className='list-group-item'>
        {this.state.column['序號']
          ? <div className='no'>{course.course_no ? course.dept_no+'-'+course.course_no : ''}</div>
          : null}
        {this.state.column['班別']
          ? <div className='class'>{course.year+course.group}</div>
          : null}
        {this.state.column['課程名稱(連結課程地圖)']
          ? <div className='name'><a href={course.map_url} target="_blank">{course.name}</a></div>
          : null}
        {this.state.column['教師姓名*:主負責老師']
          ? <div className='teacher text-right'>{course.teacher}</div>
          : null}
        {this.state.column['教室']
          ? <div className='room text-right'>{course.classroom}</div>
          : null}
        {this.state.column['時間']
          ? <div className='time text-right'>{
            course.time.split(/(?=\[)/g).map(function(t) {
              return (<span>{t}<br/></span>);
            })
          }</div>
          : null}
        {this.state.column['餘額']
          ? <div className='remain'>選 {course.selected}<br />餘 {course.remain}</div>
          : null}
        </li>
      );
    });

    return (
      <ul className='list-group course-list'>
        {courseList}
      </ul>
    );
  }
}

export default CourseList;
