import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import styled from 'styled-components'

const authenticatedOptions = (
  <Fragment>
    <NavDropdown title="Patients" id="collasible-nav-dropdown">
      <NavDropdown.Item href="#patients">All Patients</NavDropdown.Item>
      <NavDropdown.Item href="#admitted-patients">Admitted Patients</NavDropdown.Item>
      <NavDropdown.Item href="#create-patient">New Patient</NavDropdown.Item>
    </NavDropdown>
    <NavDropdown title="Appointments" id="collasible-nav-dropdown">
      <NavDropdown.Item href="#appointments">All Appointments</NavDropdown.Item>
      <NavDropdown.Item href="#create-appointment">New Appointment</NavDropdown.Item>
    </NavDropdown>
    <NavDropdown title="Security" id="collasible-nav-dropdown">
      <NavDropdown.Item href="#change-password">Change Password</NavDropdown.Item>
      <NavDropdown.Item href="#sign-out">Sign Out</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

// const unauthenticatedOptions = (
//   <Fragment>
//     <Nav.Link href="#sign-in">Sign In</Nav.Link>
//     <Nav.Link href="#sign-up">Sign Up</Nav.Link>
//   </Fragment>
// )

const Header = ({ user }) => (
  <StyledNavBar variant="dark" expand="md">
    <Navbar.Brand href="#">
      Office Manager
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user ? authenticatedOptions : '' }
      </Nav>
    </Navbar.Collapse>
  </StyledNavBar>
)

const StyledNavBar = styled(Navbar)`
  background-color: #263648;
`
export default Header
