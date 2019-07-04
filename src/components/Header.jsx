import React, { Component } from 'react';

class Header extends Component {
  render() {
    const online = this.props.online;
    return (
      <header className='row m-0'>
        <div className='col'>
          <h1>Chatty!</h1>
          <div className='header-online'>
            <p>
              *** <span className='large-number'>{online}</span> users online
              ***
            </p>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
