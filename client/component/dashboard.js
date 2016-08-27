import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class Dashboard extends Component {

  render() {
    return (
      <div>
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">EventPicz</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
          <LinkContainer to="/users">
            <NavItem eventKey={1}>Profile</NavItem>
          </LinkContainer>

            <NavItem eventKey={2} href="#">Events</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={2} href="#">Logout</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}><code>&lt;{'Col xs={12} md={8}'} /&gt;</code></Col>
          <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
          <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
          <Col xsHidden md={4}><code>&lt;{'Col xsHidden md={4}'} /&gt;</code></Col>
        </Row>

        <Row className="show-grid">
          <Col xs={6} xsOffset={6}><code>&lt;{'Col xs={6} xsOffset={6}'} /&gt;</code></Col>
        </Row>

        <Row className="show-grid">
          <Col md={6} mdPush={6}><code>&lt;{'Col md={6} mdPush={6}'} /&gt;</code></Col>
          <Col md={6} mdPull={6}><code>&lt;{'Col md={6} mdPull={6}'} /&gt;</code></Col>
        </Row>
      </Grid>

      <div>
        {this.props.children}
      </div>      
      </div>
    )
  }

}

export default Dashboard;
