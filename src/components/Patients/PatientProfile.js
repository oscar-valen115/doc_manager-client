import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import { updatePatient, getPatientsFromApi } from '../../api/patient'

class PatientProfile extends Component {
  constructor (props) {
    super(props)
    const { patients, match } = this.props
    const filteredPatientData = patients.filter(patient => patient.id === parseInt(match.params.patientId))
    this.state = {
      patient: {
        email: filteredPatientData[0].email,
        first_name: filteredPatientData[0].first_name,
        last_name: filteredPatientData[0].last_name,
        dob: filteredPatientData[0].dob,
        gender: filteredPatientData[0].gender,
        assigned_doctor: filteredPatientData[0].assigned_doctor,
        street_address: filteredPatientData[0].street_address,
        city: filteredPatientData[0].city,
        state: filteredPatientData[0].state,
        zip_code: filteredPatientData[0].zip_code,
        allergies: filteredPatientData[0].allergies,
        status: filteredPatientData[0].status
      }
    }
  }
  handleChange = (event) => {
    const updatedFields = { [event.target.name]: event.target.value }
    this.setState({ patient: updatedFields })
  }
  handleUpdatePatient = (event) => {
    event.preventDefault()
    console.log('event data: ', event)
    const { user, setPatientState, msgAlert, match, history } = this.props
    updatePatient(match.params.patientId, user, this.state)
      .then((res) => console.log('res data: ', res))
      .then(() => getPatientsFromApi(user.token))
      .then(patients => setPatientState(patients))
      .then(() => history.push('/patients'))
      .then(() => msgAlert({
        heading: 'Updated Patient Successfully',
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ patient: { email: this.state.patient.email, first_name: this.state.patient.first_name, last_name: this.state.patient.last_name, dob: this.state.patient.dob, assigned_doctor: this.state.patient.assigned_doctor, street_address: this.state.patient.street_address, city: this.state.patient.city, state: this.state.patient.state, allergies: this.state.patient.allergies } })
        msgAlert({
          heading: ' Failed to update a patient, with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { patient } = this.state
    const { patients, match, doctors } = this.props
    const filteredPatientData = patients.filter(patient => patient.id === parseInt(match.params.patientId))
    const assignedDoctorData = doctors.filter(doctor => doctor.id === filteredPatientData[0].assigned_doctor)
    const doctorDataJsx = doctors.map(doctor => (
      <Fragment key={doctor.id}>
        <option value={doctor.id}>{doctor.first_name} {doctor.last_name} Specialty: {doctor.specialty}</option>
      </Fragment>
    ))
    return (
      <Form onSubmit={this.handleUpdatePatient}>
        <Form.Row>
          <Form.Group
            as={Col}
            controlId="first_name"
          >
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name='first_name'
              value={patient.first_name}
              placeholder={filteredPatientData[0].first_name}
              onChange={this.handleChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name='last_name'
              value={patient.last_name}
              placeholder={filteredPatientData[0].last_name}
              onChange={this.handleChange} />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="street_address">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            name='street_address'
            value={patient.street_address}
            placeholder={filteredPatientData[0].street_address}
            onChange={this.handleChange} />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name='city'
              value={patient.city}
              placeholder={filteredPatientData[0].city}
              onChange={this.handleChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name='state'
              value={patient.state}
              placeholder={filteredPatientData[0].state}
              onChange={this.handleChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="zip_code">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              name='zip_code'
              value={patient.zip_code}
              onChange={this.handleChange} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name='email'
              value={patient.email}
              placeholder={filteredPatientData[0].email}
              onChange={this.handleChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="dob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="text"
              name='dob'
              value={patient.dob}
              placeholder={filteredPatientData[0].dob}
              onChange={this.handleChange} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="allergies">
            <Form.Label>Allergies</Form.Label>
            <Form.Control
              name='allergies'
              value={patient.allergies}
              type="text"
              placeholder={filteredPatientData[0].allergies}
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="assigned_doctor">
            <Form.Label className="my-1 mr-2">
              Assigned Doctor
            </Form.Label>
            <Form.Control
              as='select'
              className="my-1 mr-sm-2"
              name='assigned_doctor'
              value={patient.assigned_doctor}
              type="text"
              placeholder={filteredPatientData[0].assigned_doctor}
              onChange={this.handleChange}
            >
              <option value={assignedDoctorData[0].id}>Dr. {assignedDoctorData[0].first_name} {assignedDoctorData[0].last_name} Specialty: {assignedDoctorData[0].specialty}</option>
              {doctorDataJsx}
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Button
          variant="primary"
          type="submit"
        >
    Update Profile
        </Button>
      </Form>
    )
  }
}

export default withRouter(PatientProfile)
