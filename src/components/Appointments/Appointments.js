import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
// import _ from 'lodash'
// import Moment from 'react-moment'
// import styled from 'styled-components'

class Appointments extends Component {
  render () {
    // const { patients, user, appointments } = this.props
    // console.log('patients prop data: ', patients)
    // console.log('user prop data: ', user)
    // console.log('appointments prop data: ', appointments)
    return (
      <Fragment>
        <Row>
          <div>
            <h3>Appointments</h3>
          </div>
          <div className='ml-auto'>
            <Button variant='outline-success' href='#create-appointment'>
              <FontAwesomeIcon className='mr-1' icon={faCalendarPlus} />
              New Appt
            </Button>
          </div>
        </Row>
        <hr></hr>
        <Row>
          <Table borderless striped hover>
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
        </Row>
      </Fragment>
    )
  }
}

export default withRouter(Appointments)
