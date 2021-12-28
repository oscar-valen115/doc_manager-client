import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import styled from 'styled-components'
import DatePicker from 'react-date-picker'

class CreateAppointment extends Component {
  constructor (props) {
    super(props)
    console.log('prop data for state: ', this.props)

    this.state = {
      date: null,
      dateToggle: false,
      time: '',
      patient: '',
      doctor: '',
      reasonForVisit: '',
      thisWeekToggle: '',
      thisWeekToggleChecked: false,
      thisMonthToggle: '',
      thisMonthToggleChecked: false
    }
  }

  handleDateChange = event => {
    console.log('event data: ', event)
    // this.setState({ [event.target.name]: event.target.value })
    // console.log('date state after event: ', this.state.date)
    // this.setState({ date: new Date() })
    if (this.state.thisWeekToggleChecked || this.state.thisMonthToggleChecked) {
      this.setState({ date: event, thisWeekToggle: '', thisWeekToggleChecked: false, thisMonthToggle: '', thisMonthToggleChecked: false })
    } else if (!this.state.date) {
      this.setState({ date: event })
    } else {
      this.setState({ date: event })
    }
    console.log('date state after event: ', this.state.date)
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleWeekToggle = event => {
    if (event.target.checked && (this.state.thisMonthToggleChecked || this.state.date)) this.setState({ [event.target.name]: new Date(), thisWeekToggleChecked: true, thisMonthToggle: '', thisMonthToggleChecked: false, date: null })
    else if (event.target.checked && !this.state.thisMonthToggleChecked && !this.state.date) this.setState({ [event.target.name]: new Date(), thisWeekToggleChecked: true, date: null })
    else if (!event.target.checked) this.setState({ [event.target.name]: '', thisWeekToggleChecked: false })
  }
  handleMonthToggle = event => {
    if (event.target.checked && (this.state.thisWeekToggleChecked || this.state.date)) this.setState({ [event.target.name]: new Date(), thisMonthToggleChecked: true, thisWeekToggle: '', thisWeekToggleChecked: false, date: null })
    else if (event.target.checked && !this.state.thisWeekToggleChecked && !this.state.date) this.setState({ [event.target.name]: new Date(), thisMonthToggleChecked: true, date: null })
    else if (!event.target.checked) this.setState({ [event.target.name]: '', thisMonthToggleChecked: false })
  }

  render () {
    const { patients, doctors, appointments } = this.props

    const {
      date,
      time,
      patient,
      doctor,
      reasonForVisit,
      thisWeekToggle,
      thisMonthToggle,
      thisWeekToggleChecked,
      thisMonthToggleChecked } = this.state
    console.log('appointments prop data: ', appointments)
    const doctorsDataJsx = doctors.map(doctor => (
      <Fragment key={doctor.id}>
        <option value={doctor.id}>{doctor.first_name} {doctor.last_name} Specialty: {doctor.specialty}</option>
      </Fragment>
    ))
    const patientsDataJsx = patients.map(patient => (
      <Fragment key={patient.id}>
        <option value={patient.id}>{patient.first_name} {patient.last_name}</option>
      </Fragment>
    ))
    console.log('current state: ', this.state)
    return (
      <Fragment>
        <Row className='ml-1'>
          <h3>New Appointment</h3>
        </Row>
        <hr />
        <Form>
          <fieldset>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>Date:</Form.Label>
              <Col sm={10}>
                <DatePicker
                  name='date'
                  minDate={new Date()}
                  clearIcon={null}
                  value={date}
                  format={'MM-dd-yyyy'}
                  onChange={this.handleDateChange}
                />
                <Form.Check
                  type='checkbox'
                  className='ml-4'
                  inline label='This Week'
                  name='thisWeekToggle'
                  value={thisWeekToggle}
                  checked={thisWeekToggleChecked}
                  onChange={this.handleWeekToggle}
                />
                <Form.Check
                  type='checkbox'
                  inline label='This Month'
                  name='thisMonthToggle'
                  value={thisMonthToggle}
                  checked={thisMonthToggleChecked}
                  onChange={this.handleMonthToggle}
                />
              </Col>
            </Form.Group>
          </fieldset>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>Patient:</Form.Label>
            <Col sm={10}>
              <Form.Control
                as='select'
                className="my-1 mr-sm-2"
                name='patient'
                type="text"
                onChange={this.handleChange}
              >
                <option value={patient}>Select a Patient</option>
                {patientsDataJsx}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>Doctor:</Form.Label>
            <Col sm={10}>
              <Form.Control
                as='select'
                className="my-1 mr-sm-2"
                name="doctor"
                type="text"
                onChange={this.handleChange}
              >
                <option value={doctor}>Select a Doctor</option>
                {doctorsDataJsx}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>Availability:</Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                name="time"
                value={time}
                onChange={this.handleChange}
              >
                <option value={time}>Select a Time Slot</option>
                {/* {doctorsDataJsx} */}
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group controlId="reasonForVisit">
            <Form.Label>Reason for Visit</Form.Label>
            <Form.Control
              name='reasonForVisit'
              value={reasonForVisit}
              as="textarea"
              rows={3}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Row className='mt-2'>
            <Button
              variant="secondary"
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

export default withRouter(CreateAppointment)
