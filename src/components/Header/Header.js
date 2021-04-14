import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const authenticatedOptions = (
  <Fragment>
    <NavDropdown title="Patients" id="collasible-nav-dropdown">
      <NavDropdown.Item href="#patients">All Patients</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Admitted Patients</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.3">New Patient</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
    </NavDropdown>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    {/* <Nav.Link href="#/">Home</Nav.Link> */}
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="primary" variant="dark" expand="md">
    <Navbar.Brand href="#">
      Office Manager
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
