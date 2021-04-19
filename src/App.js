import React, { Component, Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import HomePage from './components/HomePage/HomePage'
import Patients from './components/Patients/Patients'
import CreatePatient from './components/Patients/CreatePatient'
import Appointments from './components/Appointments/Appointments'
import CreateAppointment from './components/Appointments/CreateAppointment'
import CreateDoctor from './components/Doctor/CreateDoctor'
import Doctors from './components/Doctor/Doctors'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: [],
      patients: [],
      appointments: [],
      doctors: []
    }
  }

  componentDidMount () {
    // if (!this.state.user) {
    //   return <Redirect to='/sign-in' />
    // }

    /**
    if (this.state.user) {
      getPatientsFromApi(this.state.user.token)
        .then(response => {
          console.log('patient data from api: ', response)
          return response
        })
        .then(response => this.setPatientState(response))
        .then(() => console.log('after setting patient state: ', this.state.patients))
    }
    */
  }

  setUser = user => this.setState({ user })
  clearUser = () => this.setState({ user: null })
  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }
  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  setPatientState = (response) => this.setState({ patients: response.data.patients })
  // setPatient = (response) => this.setState({ patient })
  setDoctorsState = (response) => this.setState({ doctors: response.data.doctors })
  getUserTokenFromApp = () => this.state.user.token

  render () {
    const {
      msgAlerts,
      user,
      patients,
      appointments,
      doctors
    } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route
            path='/sign-up'
            render={() => (
              <SignUp
                msgAlert={this.msgAlert}
                setUser={this.setUser} />
            )}/>
          <Route
            exact path='/'
            render={() => (
              <HomePage
                user={user}
                patients={patients}
                appointments={appointments}
                doctors={doctors}
              />
            )}/>
          <Route
            path='/sign-in'
            render={() => (
              <SignIn
                msgAlert={this.msgAlert}
                setUser={this.setUser}
                getUserTokenFromApp={this.getUserTokenFromApp}
                setPatientState={this.setPatientState}
                setDoctorsState={this.setDoctorsState}
              />
            )} />
          <AuthenticatedRoute
            user={user}
            path='/sign-out'
            render={() => (
              <SignOut
                msgAlert={this.msgAlert}
                clearUser={this.clearUser}
                user={user} />
            )} />
          <AuthenticatedRoute
            user={user}
            path='/change-password'
            render={() => (
              <ChangePassword
                msgAlert={this.msgAlert}
                user={user} />
            )} />
          <AuthenticatedRoute
            user={user}
            path='/patients'
            render={() => (
              <Patients
                msgAlert={this.msgAlert}
                user={user}
                patients={patients} />
            )} />
          <AuthenticatedRoute
            user={user}
            path='/patients/:patientId'
            render={() => (
              <Patients
                msgAlert={this.msgAlert}
                user={user}
                patients={patients} />
            )} />
          <AuthenticatedRoute
            user={user}
            path='/create-patient'
            render={() => (
              <CreatePatient
                msgAlert={this.msgAlert}
                user={user}
                patients={patients}
                doctors={doctors} />
            )} />
          <AuthenticatedRoute
            user={user}
            path='/appointments'
            render={() => (
              <Appointments
                msgAlert={this.msgAlert}
                user={user}
                patients={patients}
                appointments={appointments} />
            )} />
          <AuthenticatedRoute
            user={user}
            path='/create-appointment'
            render={() => (
              <CreateAppointment
                msgAlert={this.msgAlert}
                user={user}
                patients={patients}
                appointments={appointments} />
            )} />
          <AuthenticatedRoute
            user={user}
            path='/doctors'
            render={() => (
              <Doctors
                msgAlert={this.msgAlert}
                getUserTokenFromApp={this.getUserTokenFromApp}
                setDoctorsState={this.setDoctorsState}
                user={user}
                patients={patients}
                doctors={doctors} />
            )} />
          <AuthenticatedRoute
            user={user}
            path='/create-doctor'
            render={() => (
              <CreateDoctor
                msgAlert={this.msgAlert}
                getUserTokenFromApp={this.getUserTokenFromApp}
                setDoctorsState={this.setDoctorsState}
                user={user}
                patients={patients}
                doctors={doctors} />
            )} />
        </main>
      </Fragment>
    )
  }
}

export default withRouter(App)
