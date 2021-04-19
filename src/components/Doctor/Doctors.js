import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
// import ButtonGroup from 'react-bootstrap/ButtonGroup'
// import Button from 'react-bootstrap/Button'

class Doctors extends Component {
  render () {
    const { doctors } = this.props
    console.log('patients prop data: ', doctors)
    const doctorsJsx = (
      doctors.map(doctor => (
        <Fragment key={doctor.id}>
          <tr>
            <td>{doctor.id}</td>
            <td>{doctor.first_name}</td>
            <td>{doctor.last_name}</td>
            <td>{doctor.specialty}</td>
            <td>{doctor.email}</td>
            <td>{doctor.assigned_doctor}</td>
            <td>
              <Link to={`/patients/${doctor.id}`}>View Profile</Link>
              <Link to={`/patients/${doctor.id}`}>Delete Patient</Link>
            </td>
          </tr>
        </Fragment>
      )))

    return (
      <Fragment>
        <div>Doctors Page
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Specialty</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctorsJsx}
            </tbody>
          </Table>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Doctors)
