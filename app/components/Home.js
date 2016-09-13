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

  handleColumnSelectClick(column) {
    HomeActions.updateColumn(column);
  }

  render() {
    var collegeList = this.state.colleges.map(college => {
      return (
        <li onClick={this.handleCollegeClick.bind(this, college)} className='list-group-item'>{college}</li>
      );
    });

    var deptList = this.state.depts.map(dept => {
      return (
        <li onClick={this.handleDeptClick.bind(this, dept.href)} className='list-group-item'>{dept.text}</li>
      );
    });

    var courseList = this.state.courses.map(course => {
      return (
        <li className='list-group-item'>
        {this.state.column['序號']
          ? <span className='no'>{course['序號'].text!=''? course['系號'].text+'-'+course['序號'].text : '' }</span>
          : null}
        {this.state.column['班別']
          ? <span className='class'>{course['年級'].text+course['班別'].text}</span>
          : null}
        {this.state.column['課程名稱(連結課程地圖)']
          ? <a className='name' href={course['課程名稱(連結課程地圖)'].href} target="_blank">{course['課程名稱(連結課程地圖)'].text}</a>
          : null}
        {this.state.column['餘額 ']
          ? <span className='remain pull-right text-center'>{course['餘額 '].text}</span>
          : null}
        {this.state.column['教師姓名*:主負責老師']
          ? <span className='teacher pull-right text-right'>{course['教師姓名*:主負責老師'].text}</span>
          : null}
        {this.state.column['教室']
          ? <span className='room pull-right text-right'>{course['教室'].text}</span>
          : null}
        {this.state.column['時間']
          ? <span className='time pull-right text-right'>{course['時間'].text}</span>
          : null}
        </li>
      );
    });

    var columnList = Object.keys(this.state.column).map(h => {
      return (
        <li onClick={this.handleColumnSelectClick.bind(this, h)}>
          <a>
            {this.state.column[h]? <b>{h}</b>: h}
          </a>
        </li>
      );
    });

    return (
      <div className='container' id='main-list'>
        <div className='row'>
          <div className='col-md-3'>
            <h3>學院</h3>
            <div className='panel'>
              <ul className='list-group'>
                {collegeList}
              </ul>
            </div>
          </div>
          <div className='col-md-3'>
            <h3>系所</h3>
            <div className='panel'>
              <ul className='list-group'>
                {deptList}
              </ul>
            </div>
          </div>
          <div className='col-md-6'>
            <h3>課程列表
              <div className="dropdown">
                <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  選擇欄位
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  {columnList}
                </ul>
              </div>
            </h3>
            <div className='panel'>
              <ul className='list-group'>
                {courseList}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
