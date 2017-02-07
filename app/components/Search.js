import React from 'react';
import HomeActions from '../actions/HomeActions';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="search" className="pull-right">
        <input type="text" className="search-query" placeholder="Search" />
        <button className="search-btn"><i className="fa fa-search" aria-hidden="true"></i></button>
      </div>
    );
  }
}

export default Search;
