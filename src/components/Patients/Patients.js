import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { deletePatient, getPatientsFromApi } from '../../api/patient'

class Patients extends Component {
  render () {
    const { user, patients, setPatientState, msgAlert } = this.props
    const handleDeletePatient = patientId => {
      deletePatient(patientId, user.token)
        .then(() => getPatientsFromApi(user.token))
        .then((patients) => setPatientState(patients))
        .then(() => msgAlert({
          heading: 'Deleted Patient Successfully',
          variant: 'success'
        }))
        .catch(error => {
          msgAlert({
            heading: ' Failed to delete a patient, with error: ' + error.message,
            variant: 'danger'
          })
        })
    }

    // const handlePatientProfile = () => {}

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
              <Link
                to={`/patients/${patient.id}`}
                patients={this.props.patients}
              >
                View Profile
              </Link>
              <Button
                variant='danger'
                onClick={() => handleDeletePatient(patient.id)}
              >
                Delete Patient
              </Button>
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
