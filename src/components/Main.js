require('normalize.css');
require('styles/App.css');
require('styles/bootstrap.css');

import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class App extends React.Component {
  render() {
    return (
      <div className="index">
        <Navbar>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/ratp">
                <NavItem>Ratp</NavItem>
              </LinkContainer>
              <LinkContainer to="/doubanMovie">
                <NavItem>Douban Movie</NavItem>
              </LinkContainer>
              <LinkContainer to="/doubanOnlinecommun">
                <NavItem>Douban Online Commun</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}

App.defaultProps = {
};

export default App;
