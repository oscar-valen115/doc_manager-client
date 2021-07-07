import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'
import DatePicker from 'react-date-picker'

class CreateAppointment extends Component {
  constructor (props) {
    super(props)
    // console.log('prop data for state: ', this.props)

    this.state = {
      date: '',
      time: '',
      patient: '',
      doctor: '',
      reason_for_visit: '',
      this_week_toggle: false,
      this_month_toggle: true
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  render () {
    // const { patients, user, appointments } = this.props
    // const { date, time, patient, doctor, reason_for_visit } = this.state
    // console.log('patients prop data: ', patients)
    // console.log('user prop data: ', user)
    // console.log('appointments prop data: ', appointments)
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Create A New Appointment</h3>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>Date:</Form.Label>
              <Col sm={10}>
                <DatePicker
                  onChange={this.handleChange}
                />
                <Form.Check inline label='This Week' name='group1'></Form.Check>
                <Form.Check inline label='This Month' name='group2'></Form.Check>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>Patient:</Form.Label>
              <Col sm={10}>
                <Form.Control
                // required
                  name="lastName"
                  // value={password}
                  type="password"
                  placeholder="Patient"
                // onChange={this.handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>Doctor:</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="assignedDoctor"
                  // value={email}
                  placeholder="Doctor"
                // onChange={this.handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>Availability:</Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="assignedDoctor"
                  // value={email}
                  placeholder="Time Slots"
                // onChange={this.handleChange}
                />
              </Col>
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
