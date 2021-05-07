import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import { updatePatient, getPatientsFromApi } from '../../api/patient'

class PatientProfile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      patient: {
        email: '',
        firstName: '',
        lastName: '',
        dob: '',
        assignedDoctor: '',
        streetAddress: '',
        city: '',
        allergies: ''
      },
      updated: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })
  handleUpdatePatient = (patientId) => {
    const { user, setPatientState, msgAlert } = this.props
    updatePatient(patientId, user.token, this.state)
      .then(() => getPatientsFromApi(user.token))
      .then(patients => setPatientState(patients))
      .then(() => history.push('/patients'))
      .then(() => msgAlert({
        heading: 'Updated Patient Successfully',
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ email: '', firstName: '', lastName: '', dob: '', assignedDoctor: '' })
        msgAlert({
          heading: ' Failed to update a patient, with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, firstName, lastName, dob, streetAddress, city, allergies } = this.state
    const { patients, match } = this.props
    const filteredPatientData = patients.filter(patient => patient.id === parseInt(match.params.patientId))
    // const patientId = filteredPatientData[0].id
    return (
      <Form onSubmit={this.handleUpdatePatient}>
        <Form.Row>
          <Form.Group
            as={Col}
            controlId="firstName"
          >
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name='firstName'
              value={firstName}
              placeholder={filteredPatientData[0].firstName}
              onChange={this.handleChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name='lastName'
              value={lastName}
              placeholder={filteredPatientData[0].lastName}
              onChange={this.handleChange} />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="streetAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name='streetAddress'
            value={streetAddress}
            placeholder={filteredPatientData[0].streetAddress}
            onChange={this.handleChange} />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              name='city'
              value={city}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control as="select" defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="zip_code">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              name='zip_code'
              value={zip_code} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name='email'
              value={email}
              placeholder={filteredPatientData[0].email}
              onChange={this.handleChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="dob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="text"
              name='dob'
              value={dob}
              placeholder={filteredPatientData[0].dob}
              onChange={this.handleChange} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="allergies">
            <Form.Label>Allergies</Form.Label>
            <Form.Control
              name='allergies'
              value={allergies}
              type="text" placeholder={filteredPatientData[0].allergies}
              onChange={this.handleChange} />
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
