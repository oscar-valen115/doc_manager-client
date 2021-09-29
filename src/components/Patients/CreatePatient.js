import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import { createPatient, getPatientsFromApi } from '../../api/patient'

class CreatePatient extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      dob: '',
      assignedDoctor: '',
      zip_code: '',
      gender: '',
      status: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreatePatient = event => {
    event.preventDefault()

    const {
      msgAlert,
      history,
      setPatientState,
      user
    } = this.props

    createPatient(this.state, user)
      .then(() => getPatientsFromApi(user.token))
      .then(patients => setPatientState(patients))
      .then(() => history.push('/patients'))
      .then(() => msgAlert({
        heading: 'Created Patient Successfully',
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ email: '', firstName: '', lastName: '', dob: '', assignedDoctor: '' })
        msgAlert({
          heading: ' Failed to create a patient, with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, firstName, lastName, dob, assignedDoctor } = this.state
    const { doctors } = this.props
    const doctorDataJsx = doctors.map(doctor => (
      <Fragment key={doctor.id}>
        <option value={doctor.id}>{doctor.first_name} {doctor.last_name} Specialty: {doctor.specialty}</option>
      </Fragment>
    ))
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Create New Patient</h3>
          <Form onSubmit={this.onCreatePatient}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={email}
                placeholder="Enter First Name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="firstName"
                value={firstName}
                placeholder="Enter First Name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                name="lastName"
                value={lastName}
                type="text"
                placeholder="Enter Last Name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="dob">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                required
                name="dob"
                value={dob}
                type="text"
                placeholder="Enter Date of Birth"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="assignedDoctor">
              <Form.Label>Assign a Doctor</Form.Label>
              <Form.Control
                as='select'
                className="my-1 mr-sm-2"
                name='assignedDoctor'
                type="text"
                onChange={this.handleChange}
              >
                <option value={assignedDoctor}>Select a Doctor</option>
                {doctorDataJsx}
              </Form.Control>
            </Form.Group>
            <StyledButton
              variant="primary"
              type="submit"
            >
              Add
            </StyledButton>
          </Form>
        </div>
      </div>
    )
  }
}

const StyledButton = styled(Button)`
 background-color: #00bd9c;
`
// const StyledForm = styled(Form)`
//   background-color: #dde5ee;
// `

export default withRouter(CreatePatient)
