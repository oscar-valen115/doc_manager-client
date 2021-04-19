import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

class Patients extends Component {
  render () {
    const { patients } = this.props
    console.log('patients prop data: ', patients)
    const patientsJsx = (
      patients.map(patient => (
        <Fragment key={patient.id}>
          <tr>
            <td>{patient.id}</td>
            <td>{patient.first_name}</td>
            <td>{patient.last_name}</td>
            <td>{patient.dob}</td>
            <td>{patient.email}</td>
            <td>{patient.assigned_doctor}</td>
            <td>
              <ButtonGroup aria-label="Basic example">
                <Button
                  variant="secondary"
                >
                  View Profile
                </Button>
                <Button
                  variant="danger"
                >
                Delete Patient
                </Button>
              </ButtonGroup>
            </td>
          </tr>
        </Fragment>
      )))

    return (
      <Fragment>
        <div>Patients Page
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>DOB</th>
                <th>Email</th>
                <th>Assigned Doctor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patientsJsx}
            </tbody>
          </Table>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Patients)
