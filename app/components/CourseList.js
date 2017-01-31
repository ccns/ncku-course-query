import React from 'react';
import HomeActions from '../actions/HomeActions';

class CourseList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var courseList = this.props.courses.map((course, index) => {
      return (
        <li className='list-group-item' key={index}>
        {this.props.column['序號']
          ? <div className='no'>{course.course_no ? course.dept_no+'-'+course.course_no : ''}</div>
          : null}
        {this.props.column['班別']
          ? <div className='class'>{course.year+course.group}</div>
          : null}
        {this.props.column['課程名稱(連結課程地圖)']
          ? <div className='name'><a href={course.map_url} target="_blank">{course.name}</a></div>
          : null}
        {this.props.column['教師姓名*:主負責老師']
          ? <div className='teacher text-right'>{course.teacher}</div>
          : null}
        {this.props.column['教室']
          ? <div className='room text-right'>{course.classroom}</div>
          : null}
        {this.props.column['時間']
          ? <div className='time text-right'>{
            course.time.split(/(?=\[)/g).map((t, i) => {
              return (<span key={i}>{t}<br/></span>);
              })
          }</div>
          : null}
        {this.props.column['餘額']
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
