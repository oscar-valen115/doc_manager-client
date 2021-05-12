import React, { Component } from 'react'
// import styled from 'styled-components'
// import Spinner from 'react-bootstrap/Spinner'
import { Redirect, withRouter } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const { appointments, user, doctors, patients } = this.props
    console.log('appointment data on homepage: ', appointments)
    console.log('doctors data: ', doctors)
    console.log('patients data: ', patients)
    if (!user) {
      return <Redirect to='/sign-in' />
    }
    return (
      <Container fluid>
        <div>Appoints for today</div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Time</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>DOB</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>08:00 AM</td>
              <td>Patient</td>
              <td>one</td>
              <td>01-01-1900</td>
              <td>Checked In</td>
              <td>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="secondary">Check Out</Button>
                  <Button variant="secondary">View Profile</Button>
                </ButtonGroup>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    )
  }
}

export default withRouter(HomePage)
