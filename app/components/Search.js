import React from 'react';
import HomeActions from '../actions/HomeActions';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleKeyPress(event) {
    if(event.key === 'Enter') this.handleSearchClick();
  }

  handleSearchClick() {
    HomeActions.search(this.state.value, this.props.dept);
  }

  render() {
    return (
      <div id="search" className="pull-right">
        <input type="text" className="search-query" placeholder="Search"  value={this.state.value} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} />
        <button className="search-btn" onClick={this.handleSearchClick.bind(this)}><i className="fa fa-search" aria-hidden="true"></i></button>
      </div>
    );
  }
}

export default Search;
