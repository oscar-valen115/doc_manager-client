import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
// import { deletePatient, getPatientsFromApi } from '../../api/patient'

class Patients extends Component {
  render () {
    const { patients } = this.props
    // const patientDetails = patients.map((patient, index) => {
    //   // for (let i = 0; i < patients.length; i++) {
    //   if (patient.assigned_doctor === doctors[index].id) {
    //     patient.assigned_doctor = doctors[index]
    //   }
    //   // }
    // })

    // const handlePatientProfile = () => {}

    const patientsJsx = (
      patients.map(patient => (
        <Fragment key={patient.id}>
          <tr>
            <td>{patient.id}</td>
            <td>{patient.dob}</td>
            <td>{patient.first_name}</td>
            <td>{patient.last_name}</td>
            <td>{patient.email}</td>
            {/* <td>{patient.assigned_doctor}</td> */}
            <td>
              <Link
                to={`/patients/${patient.id}`}
                patients={this.props.patients}
              >
                View
              </Link>
            </td>
          </tr>
        </Fragment>
      )))

    return (
      <Fragment>
        <Row>
          <div>
            <h3>Patients</h3>
          </div>
          <div className='ml-auto'>
            <Button variant='outline-success' href='#create-patient'>New Patient</Button>
          </div>
        </Row>
        <hr></hr>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>DOB</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                {/* <th>Assigned Doctor</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patientsJsx}
            </tbody>
          </Table>
        </Row>
      </Fragment>
    )
  }
}

export default withRouter(Patients)
