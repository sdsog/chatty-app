import React, { Component } from 'react';

class Header extends Component {
  render() {
    const online = this.props.online;
    return (
      <header className='row m-0'>
        <div className='col'>
          <h1>Chatty</h1>
          <span className='navbar-online'>{online} users online</span>
        </div>
      </header>
    );
  }
}

export default Header;
