import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
// import _ from 'lodash'
// import Moment from 'react-moment'
// import styled from 'styled-components'

class Patients extends Component {
  render () {
    const { patients } = this.props
    console.log('patients prop data: ', patients)
    return (
      <Fragment>
        <div>Patients Page</div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
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
      </Fragment>
    )
  }
}

export default withRouter(Patients)
