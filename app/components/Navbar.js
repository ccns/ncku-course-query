import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = NavbarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    NavbarStore.listen(this.onChange);
    NavbarActions.getMenu();
  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let navMenus = this.state.menus.map((menu) => {
      return (
        <li>
          <a href={menu.href} target="_blank">{menu.text}</a>
        </li>
      )
    });
     
    let navLinks = this.state.relatedLinks.map((link) => {
      return (
        <li>
          <a href={link.href} target="_blank">{link.text}</a>
        </li>
      )
    });
     
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className='navbar-header'>
          <Link to='/' className='navbar-brand'>
            NCKU Course Query
          </Link>
        </div>
        <div id='navbar' className='navbar-collapse collapse'>
          <ul className='nav navbar-nav'>
            {navMenus}
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown'>相關連結 <span className='caret'></span></a>
              <ul className='dropdown-menu'>
              {navLinks}
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;