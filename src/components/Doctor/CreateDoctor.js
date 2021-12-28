import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
// import styled from 'styled-components'
import { createDoctor, getDoctorsFromApi } from '../../api/doctor'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

class CreateDoctor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      specialty: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreateDoctor = event => {
    event.preventDefault()

    const {
      msgAlert,
      history,
      setDoctorsState,
      getUserTokenFromApp,
      user
    } = this.props

    createDoctor(this.state, user)
      .then(response => {
        console.log('response data: ', response)
        console.log('user data: ', user)
        return response
      })
      .then(() => msgAlert({
        heading: 'Created Doctor Successfully',
        variant: 'success'
      }))
      .then(() => getDoctorsFromApi(getUserTokenFromApp()))
      .then(doctors => setDoctorsState(doctors))
      .then(() => history.push('/doctors'))
      .catch(error => {
        this.setState({ email: '', firstName: '', lastName: '', specialty: '' })
        msgAlert({
          heading: ' Failed to create a doctor, with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, firstName, lastName, specialty } = this.state

    return (
      <Fragment>
        <Row className='ml-1'>
          <h3>New Doctor</h3>
        </Row>
        <hr />
        <Form onSubmit={this.onCreateDoctor}>
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
                      placeholder="Enter Email"
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
                  <Form.Group controlId="specialty">
                    <Form.Label>Specialty</Form.Label>
                    <Form.Control
                      required
                      name="specialty"
                      as='select'
                      type="text"
                      placeholder="Choose Specialty"
                      onChange={this.handleChange}
                    >
                      <option value={specialty}>Select a Specialty</option>
                      <option value='General'>General</option>
                      <option value='Pediatrics'>Pediatrics</option>
                      <option value='Cardiology'>Cardiology</option>
                    </Form.Control>
                  </Form.Group>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Row className='mt-2'>
            <Button
              variant='secondary'
              type="submit"
              className="ml-auto mr-2"
            >
              Add
            </Button>
            <Button
              variant='danger'
              type='button'
              className="mr-3"
              href='#doctors'
            >
              Cancel
            </Button>
          </Row>
        </Form>
      </Fragment>
    )
  }
}

// const StyledButton = styled(Button)`
//  background-color: #00bd9c;
// `
// const StyledForm = styled(Form)`
//   background-color: #dde5ee;
// `

export default withRouter(CreateDoctor)
