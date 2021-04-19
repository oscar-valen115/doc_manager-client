import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import { getPatientsFromApi } from '../../api/patient'
import { getDoctorsFromApi } from '../../api/doctor'
class SignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { msgAlert,
      history,
      setUser,
      getUserTokenFromApp,
      setPatientState,
      setDoctorsState
    } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .then(() => getPatientsFromApi(getUserTokenFromApp()))
      .then(patients => setPatientState(patients))
      .then(() => getDoctorsFromApi(getUserTokenFromApp()))
      .then(doctors => setDoctorsState(doctors))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign In</h3>
          <Form onSubmit={this.onSignIn}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <StyledButton
              variant="primary"
              type="submit"
            >
              Submit
            </StyledButton>
            <p className="forgot-password text-right">
                  Not registered? <a href="#/sign-up">Sign Up</a>
            </p>
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

export default withRouter(SignIn)
