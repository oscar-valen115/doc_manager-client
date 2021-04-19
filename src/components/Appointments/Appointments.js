import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
// import _ from 'lodash'
// import Moment from 'react-moment'
// import styled from 'styled-components'

class Appointments extends Component {
  render () {
    const { patients, user, appointments } = this.props
    console.log('patients prop data: ', patients)
    console.log('user prop data: ', user)
    console.log('appointments prop data: ', appointments)
    return (
      <Container fluid>
        <div>Appoints Page</div>
        <Button variant="primary">New Appt</Button>
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

export default withRouter(Appointments)
