import React from 'react';
import HomeActions from '../actions/HomeActions';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      times: []
    }
  }

  handleFilterDayClick(day) {
    this.setState(prevState => {
      var days = prevState.days;
      var index = days.indexOf(day);
      if(index > -1) days.splice(index, 1);
      else days.push(day);
      return {days: days};
    });
    HomeActions.filterDay(this.state.days);
  }

  handleFilterTimeClick(time) {
    this.setState(prevState => {
      var times = prevState.times;
      var index = times.indexOf(time);
      if(index > -1) times.splice(index, 1);
      else times.push(time);
      return {times: times};
    });
    HomeActions.filterTime(this.state.times);
  }

  render() {
    var active;
    return (
      <div className="dropdown" id="filterMenu">
        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" aria-haspopup="true" aria-expanded="true">
          篩選器
          <span className="caret"></span>
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu2" id="filter">
          <li>時間</li>
          <li>
            <div className="btn-group" role="group" aria-label="..." id="day">
            <button type="button" className="btn btn-default"
              onClick={this.handleFilterDayClick.bind(this, "M")}>一</button>
            <button type="button" className="btn btn-default"
              onClick={this.handleFilterDayClick.bind(this, "T")}>二</button>
            <button type="button" className="btn btn-default"
              onClick={this.handleFilterDayClick.bind(this, "W")}>三</button>
            <button type="button" className="btn btn-default"
              onClick={this.handleFilterDayClick.bind(this, "R")}>四</button>
            <button type="button" className="btn btn-default"
              onClick={this.handleFilterDayClick.bind(this, "F")}>五</button>
            </div>
          </li>
          <li>
            <div className="btn-group" role="group" aria-label="..." id="time">
              <div className="row-1">
                <button type="button" className="btn btn-default"
                  onClick={this.handleFilterTimeClick.bind(this, "1")}>1</button>
                <button type="button" className="btn btn-default"
                  onClick={this.handleFilterTimeClick.bind(this, "2")}>2</button>
                <button type="button" className="btn btn-default"
                  onClick={this.handleFilterTimeClick.bind(this, "3")}>3</button>
                <button type="button" className="btn btn-default"
                  onClick={this.handleFilterTimeClick.bind(this, "4")}>4</button>
                <button type="button" className="btn btn-default"
                  onClick={this.handleFilterTimeClick.bind(this, "5")}>N</button>
              </div>
              <div className="row-2">
                <button type="button" className="btn btn-default"
                  onClick={this.handleFilterTimeClick.bind(this, "6")}>5</button>
                <button type="button" className="btn btn-default"
                  onClick={this.handleFilterTimeClick.bind(this, "7")}>6</button>
                <button type="button" className="btn btn-default"
                  onClick={this.handleFilterTimeClick.bind(this, "8")}>7</button>
                <button type="button" className="btn btn-default"
                  onClick={this.handleFilterTimeClick.bind(this, "9")}>8</button>
                <button type="button" className="btn btn-default"
                  onClick={this.handleFilterTimeClick.bind(this, "10")}>9</button>
              </div>
              <div className="row-3">
                <button type="button" className="btn btn-default"
                  onClick={this.handleFilterTimeClick.bind(this, "11")}>A</button>
                <button type="button" className="btn btn-default"
                  onClick={this.handleFilterTimeClick.bind(this, "12")}>B</button>
                <button type="button" className="btn btn-default"
                  onClick={this.handleFilterTimeClick.bind(this, "13")}>C</button>
                <button type="button" className="btn btn-default"
                  onClick={this.handleFilterTimeClick.bind(this, "14")}>D</button>
                <button type="button" className="btn btn-default"
                  onClick={this.handleFilterTimeClick.bind(this, "15")}>E</button>
              </div>
            </div>
          </li>
        </div>
      </div>
    );
  }
}

export default Filter;
