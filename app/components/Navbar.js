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
    NavbarActions.getLinks();

    $(document).ajaxStart(() => {
      NavbarActions.updateAjaxAnimation('fadeIn');
    });

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        NavbarActions.updateAjaxAnimation('fadeOut');
      }, 750);
    });
  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let navMenus = this.state.links.map((link, index) => {
      if(typeof link.href === 'string') {
        return (
          <li key={index}>
            <a href={link.href} target="_blank">{link.text}</a>
          </li>
        )
      } else {
        let links = link.href.map((menu, index) => {
          return (
            <li key={index}>
              <a href={menu.href} target="_blank">{menu.text}</a>
            </li>
          )
        });
        return (
          <li className='dropdown'>
            <a href='#' className='dropdown-toggle' data-toggle='dropdown'>{link.text} <span className='caret'></span></a>
            <ul className='dropdown-menu'>
            {links}
            </ul>
          </li>
        )
      }
    });

    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className='navbar-header'>
          <Link to='/' className='navbar-brand'>
            <span ref='triangles' className={'triangles animated ' + this.state.ajaxAnimationClass}>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
            </span>
            NCKU Course Query
          </Link>
        </div>
        <div id='navbar' className='navbar-collapse collapse'>
          <ul className='nav navbar-nav'>
            {navMenus}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
