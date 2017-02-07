import React from 'react';
import HomeActions from '../actions/HomeActions';

class Filter extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFilterTimeClick(time) {
    HomeActions.filterTime(time);
  }

  render() {
    var timeStr = ["1", "2", "3", "4", "N", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E"]
    var rows = [...Array(15-3).keys()].map(i => {
      return (
        <div className={"row-"+i}>
          <button type="button" className="btn btn-default"
            onClick={this.handleFilterTimeClick.bind(this, "M"+(i+1))}>{timeStr[i]}</button>
          <button type="button" className="btn btn-default"
            onClick={this.handleFilterTimeClick.bind(this, "T"+(i+1))}>{timeStr[i]}</button>
          <button type="button" className="btn btn-default"
            onClick={this.handleFilterTimeClick.bind(this, "W"+(i+1))}>{timeStr[i]}</button>
          <button type="button" className="btn btn-default"
            onClick={this.handleFilterTimeClick.bind(this, "R"+(i+1))}>{timeStr[i]}</button>
          <button type="button" className="btn btn-default"
            onClick={this.handleFilterTimeClick.bind(this, "F"+(i+1))}>{timeStr[i]}</button>
        </div>
      );
    })
    return (
      <div className="dropdown" id="filterMenu">
        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" aria-haspopup="true" aria-expanded="true">
          篩選器
          <span className="caret"></span>
        </button>
        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2" id="filter">
          <li>時間</li>
          <li>
            <div className="btn-group" role="group" aria-label="..." id="day">
              <div>一</div>
              <div>二</div>
              <div>三</div>
              <div>四</div>
              <div>五</div>
            </div>
          </li>
          <li>
            <div className="btn-group" role="group" aria-label="..." id="time">
              {rows}
            </div>
          </li>
        </div>
      </div>
    );
  }
}

export default Filter;
