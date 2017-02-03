import React from 'react';
import HomeActions from '../actions/HomeActions';

class CourseList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var courseList = this.props.courses.map((course, index) => {
      if(!course.hide) {
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
              course.time.split(',').map((t, i) => {
                return (<span key={i}>{timeFormatter(t)}<br/></span>);
                })
            }</div>
            : null}
          {this.props.column['餘額']
            ? <div className='remain'>選 {course.selected}<br />餘 {course.remain}</div>
            : null}
          </li>
        );
      }
    });

    return (
      <ul className='list-group course-list'>
        {courseList}
      </ul>
    );
  }
}

export default CourseList;

function timeFormatter(str) {
  if(!str) return "未定";
  var day = str.substring(0,1);
  var time = str.substring(1,str.length).split('-').map(classtimes);
  if(time.length > 1) return day+time[0]+'-'+time[1];
  else return day+time[0];
}

function classtimes(s) {
  switch(s) {
    case '0': return '0';
    case '1': return '1';
    case '2': return '2';
    case '3': return '3';
    case '4': return '4';
    case '5': return 'N';
    case '6': return '5';
    case '7': return '6';
    case '8': return '7';
    case '9': return '8';
    case '10': return '9';
    case '11': return 'A';
    case '12': return 'B';
    case '13': return 'C';
    case '14': return 'D';
    case '15': return 'E';
  }
}
