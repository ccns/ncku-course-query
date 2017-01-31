import React from 'react';
import HomeActions from '../actions/HomeActions';

class Filter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dropdown">
        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          篩選器
          <span className="caret"></span>
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu2" id="filter">
          <li>時間</li>
          <li>
            <div className="btn-group" role="group" aria-label="..." id="day">
              <button type="button" className="btn btn-default">一</button>
              <button type="button" className="btn btn-default">二</button>
              <button type="button" className="btn btn-default">三</button>
              <button type="button" className="btn btn-default">四</button>
              <button type="button" className="btn btn-default">五</button>
            </div>
          </li>
          <li>
            <div className="btn-group" role="group" aria-label="..." id="time">
              <div className="row-1">
                <button type="button" className="btn btn-default">1</button>
                <button type="button" className="btn btn-default">2</button>
                <button type="button" className="btn btn-default">3</button>
                <button type="button" className="btn btn-default">4</button>
                <button type="button" className="btn btn-default">N</button>
              </div>
              <div className="row-2">
                <button type="button" className="btn btn-default">5</button>
                <button type="button" className="btn btn-default">6</button>
                <button type="button" className="btn btn-default">7</button>
                <button type="button" className="btn btn-default">8</button>
                <button type="button" className="btn btn-default">9</button>
              </div>
            </div>
          </li>
        </div>
      </div>
    );
  }
}

export default Filter;
