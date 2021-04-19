import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
// import _ from 'lodash'
// import Moment from 'react-moment'
// import styled from 'styled-components'

class CreateAppointment extends Component {
  render () {
    const { patients, user, appointments } = this.props
    console.log('patients prop data: ', patients)
    console.log('user prop data: ', user)
    console.log('appointments prop data: ', appointments)
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Create A New Appointment</h3>
          <Form>
            <Form.Group>
              <Form.Label>Month</Form.Label>
              <Form.Control
                // required
                type="text"
                name="firstName"
                // value={email}
                placeholder="Enter First Name"
                // onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Day</Form.Label>
              <Form.Control
                // required
                name="lastName"
                // value={password}
                type="password"
                placeholder="Enter Last Name"
                // onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                name="assignedDoctor"
                // value={email}
                placeholder="Enter Their Doctor"
                // onChange={this.handleChange}
              />
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

export default withRouter(CreateAppointment)
