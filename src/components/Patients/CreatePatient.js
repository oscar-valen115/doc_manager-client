import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import styled from 'styled-components'
import { createPatient, getPatientsFromApi } from '../../api/patient'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'

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
      <Fragment>
        <Row className='ml-1'>
          <h3>New Patient</h3>
        </Row>
        <hr />
        <Form onSubmit={this.onCreatePatient}>
          <Accordion defaultActiveKey='0'>
            <Card style={{ borderColor: '#00bd9c' }}>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Basic Information
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
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
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Row className='mt-2'>
            <Button
              type="submit"
              variant='secondary'
              className="ml-auto mr-2"
            >
                    Add
            </Button>
            <Button
              variant='danger'
              type='button'
              className="mr-3"
              href='#patients'
            >
              Cancel
            </Button>
          </Row>
        </Form>
      </Fragment>
    )
  }
}

export default withRouter(CreatePatient)
