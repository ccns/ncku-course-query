import React from 'react';
import HomeActions from '../actions/HomeActions';

class CollegeList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCollegeClick(college) {
    HomeActions.updateDepts(college);
    if ($(window).width() < 992) {
      $('html, body').animate({
        scrollTop: $("#dept-container").offset().top
      }, 500);
    }
  }

  render() {
    var collegeList = this.props.colleges.map((college, index) => {
      return (
        <li onClick={this.handleCollegeClick.bind(this, college)} className='list-group-item' key={index}>{college}</li>
      );
    });

    return (
      <ul className='list-group'>
        {collegeList}
      </ul>
    );
  }
}

export default CollegeList;
