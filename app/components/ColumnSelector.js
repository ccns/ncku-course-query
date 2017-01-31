import React from 'react';
import HomeActions from '../actions/HomeActions';

class ColumnSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  handleColumnSelectClick(column) {
    HomeActions.updateColumn(column);
  }

  render() {
    var columnList = Object.keys(this.props.column).map((h, index) => {
      return (
        <li onClick={this.handleColumnSelectClick.bind(this, h)} key={index}>
          <a>
            {this.props.column[h]? <b>{'[ｖ] '+h}</b> : '[　] '+h}
          </a>
        </li>
      );
    });

    return (
      <div className="dropdown">
        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          顯示欄位
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          {columnList}
        </ul>
      </div>
    );
  }
}

export default ColumnSelector;
