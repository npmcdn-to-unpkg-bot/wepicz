import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class Dashboard extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div>
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">WePicz</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
          <LinkContainer to="/users">
            <NavItem eventKey={1}>Profile</NavItem>
          </LinkContainer>
          <LinkContainer to="/events">
            <NavItem eventKey={1}>Events</NavItem>
          </LinkContainer>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={2} href="#">Logout</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="container">
        <h1>Dashboard</h1>
      </div>

      <div className="container">
        {this.props.children}
      </div>
      </div>
    )
  }

}

export default Dashboard;
