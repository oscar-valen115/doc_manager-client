import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import { updatePatient, getPatientsFromApi } from '../../api/patient'

class DoctorProfile extends Component {
  constructor (props) {
    super(props)
    const { doctors, match } = this.props
    const filteredDoctorData = doctors.filter(doctor => doctor.id === parseInt(match.params.doctorId))
    this.state = {
      doctor: {
        email: filteredDoctorData[0].email,
        first_name: filteredDoctorData[0].first_name,
        last_name: filteredDoctorData[0].last_name,
        specialty: filteredDoctorData[0].specialty
        // dob: filteredDoctorData[0].dob,
        // gender: filteredDoctorData[0].gender,
        // assigned_doctor: filteredDoctorData[0].assigned_doctor,
        // street_address: filteredDoctorData[0].street_address,
        // city: filteredDoctorData[0].city,
        // state: filteredDoctorData[0].state,
        // zip_code: filteredDoctorData[0].zip_code,
        // allergies: filteredDoctorData[0].allergies,
        // status: filteredDoctorData[0].status
      }
    }
  }
  handleChange = (event) => {
    const updatedFields = { [event.target.name]: event.target.value }
    this.setState({ doctor: updatedFields })
  }
  handleUpdateDoctor = (event) => {
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
        this.setState({ doctor: { email: '', first_name: '', last_name: '', dob: '', assigned_doctor: '', street_address: '', city: '', state: '', allergies: '' } })
        msgAlert({
          heading: ' Failed to update a patient, with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { doctor } = this.state
    const { match, doctors } = this.props
    const filteredDoctorData = doctors.filter(doctor => doctor.id === parseInt(match.params.doctorId))
    // const assignedDoctorData = doctors.filter(doctor => doctor.id === filteredPatientData[0].assigned_doctor)
    // const doctorDataJsx = doctors.map(doctor => (
    //   <Fragment key={doctor.id}>
    //     <option value={doctor.id}>{doctor.first_name} {doctor.last_name} Specialty: {doctor.specialty}</option>
    //   </Fragment>
    // ))
    return (
      <Form onSubmit={this.handleUpdateDoctor}>
        <Form.Row>
          <Form.Group
            as={Col}
            controlId="first_name"
          >
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name='first_name'
              value={doctor.first_name}
              placeholder={filteredDoctorData[0].first_name}
              onChange={this.handleChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name='last_name'
              value={doctor.last_name}
              placeholder={filteredDoctorData[0].last_name}
              onChange={this.handleChange} />
          </Form.Group>
        </Form.Row>

        {/* <Form.Group controlId="street_address">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            name='street_address'
            value={doctor.street_address}
            placeholder={filteredDoctorData[0].street_address}
            onChange={this.handleChange} />
        </Form.Group> */}

        <Form.Row>
          {/* <Form.Group as={Col} controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name='city'
              value={doctor.city}
              placeholder={filteredDoctorData[0].city}
              onChange={this.handleChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name='state'
              value={doctor.state}
              placeholder={filteredDoctorData[0].state}
              onChange={this.handleChange} />
          </Form.Group> */}

          <Form.Group as={Col} controlId="specialty">
            <Form.Label>Specialty</Form.Label>
            <Form.Control
              name='specialty'
              value={doctor.specialty}
              onChange={this.handleChange} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name='email'
              value={doctor.email}
              placeholder={filteredDoctorData[0].email}
              onChange={this.handleChange} />
          </Form.Group>

          {/* <Form.Group as={Col} controlId="dob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="text"
              name='dob'
              value={doctor.dob}
              placeholder={filteredDoctorData[0].dob}
              onChange={this.handleChange} />
          </Form.Group> */}
        </Form.Row>

        <Form.Row>
          {/* <Form.Group as={Col} controlId="allergies">
            <Form.Label>Allergies</Form.Label>
            <Form.Control
              name='allergies'
              value={doctor.allergies}
              type="text"
              placeholder={filteredDoctorData[0].allergies}
              onChange={this.handleChange} />
          </Form.Group> */}
          {/* <Form.Group as={Col} controlId="assigned_doctor">
            <Form.Label className="my-1 mr-2">
              Assigned Doctor
            </Form.Label>
            <Form.Control
              as='select'
              className="my-1 mr-sm-2"
              name='assigned_doctor'
              value={doctor.assigned_doctor}
              type="text"
              placeholder={filteredDoctorData[0].assigned_doctor}
              onChange={this.handleChange}
            >
              <option value={assignedDoctorData[0].id}>Dr. {assignedDoctorData[0].first_name} {assignedDoctorData[0].last_name} Specialty: {assignedDoctorData[0].specialty}</option>
              {doctorDataJsx}
            </Form.Control>
          </Form.Group> */}
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

export default withRouter(DoctorProfile)
