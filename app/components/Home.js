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

  render() {
    return (
      <div className='container' id='main-list'>
        <div className='row'>
          <div className='col-md-3'>
            <h3>學院</h3>
            <div className='panel'>
              <CollegeList colleges={this.state.colleges}/>
            </div>
          </div>
          <div className='col-md-3'>
            <h3>系所</h3>
            <div className='panel'>
              <DeptList depts={this.state.depts}/>
            </div>
          </div>
          <div className='col-md-6'>
            <h3>課程列表
              <ColumnSelector column={this.state.column}/>
              <Filter/>
            </h3>
            <div className='panel'>
              <CourseList courses={this.state.courses}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
