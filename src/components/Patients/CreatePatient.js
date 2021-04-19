import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
class CreatePatient extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  // handleChange = event => this.setState({
  //   [event.target.name]: event.target.value
  // })

  // onSignIn = event => {
  //   event.preventDefault()

  //   const { msgAlert,
  //     history,
  //     setUser,
  //     getUserTokenFromApp,
  //     setPatientState
  //   } = this.props

  //   signIn(this.state)
  //     .then(res => setUser(res.data.user))
  //     .then(() => msgAlert({
  //       heading: 'Sign In Success',
  //       message: messages.signInSuccess,
  //       variant: 'success'
  //     }))
  //     .then(() => getPatientsFromApi(getUserTokenFromApp()))
  //     .then(patients => setPatientState(patients))
  //     .then(() => history.push('/'))
  //     .catch(error => {
  //       this.setState({ email: '', password: '' })
  //       msgAlert({
  //         heading: 'Sign In Failed with error: ' + error.message,
  //         message: messages.signInFailure,
  //         variant: 'danger'
  //       })
  //     })
  // }

  render () {
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Create New Patient</h3>
          <Form>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
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
              <Form.Label>Last Name</Form.Label>
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
              <Form.Label>Assigned Doctor</Form.Label>
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
// const StyledForm = styled(Form)`
//   background-color: #dde5ee;
// `

export default withRouter(CreatePatient)
