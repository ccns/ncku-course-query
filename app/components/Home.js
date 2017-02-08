import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import {first, without, findWhere} from 'underscore';
import CollegeList from './CollegeList'
import DeptList from './DeptList'
import CourseList from './CourseList'
import ColumnSelector from './ColumnSelector'
import Filter from './Filter'
import Search from './Search'

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
    this.state.width = 1080;
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
    HomeActions.getDeptList();
    this.setState({width:window.innerWidth});
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSkipClick() {
    if ($(window).width() < 992) {
      $('html, body').animate({
        scrollTop: $("#course-container").offset().top
      }, 500);
      $('input.search-query').focus();
    }
  }

  render() {
    return (
      <div className='container' id='main-container'>
        <div className='row'>
          <div className='col-sm-6 col-md-1 panel-container' id='college-container'>
            <h3>學院
              {this.state.width < 992?
              <button className="btn btn-default" id="skip" onClick={this.handleSkipClick.bind(this)}>
                搜尋全部課程
              </button>
              :null}
            </h3>
            <div className='panel'>
              <CollegeList deptList={this.state.deptList}/>
            </div>
          </div>
          <div className='col-sm-6 col-md-1 panel-container' id='dept-container'>
            <h3>系所</h3>
            <div className='panel'>
              <DeptList depts={this.state.depts}/>
            </div>
          </div>
          <div className='col-sm-12 col-md-10 panel-container' id='course-container'>
            <h3>課程列表
              <ColumnSelector column={this.state.column}/>
              <Filter/>
            </h3>
            <div className='panel'>
              <Search dept={this.state.deptSelected} />
              <CourseList courses={this.state.courses} column={this.state.column}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
