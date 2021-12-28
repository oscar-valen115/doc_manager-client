import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { updatePatient, deletePatient, getPatientsFromApi } from '../../api/patient'

class PatientProfile extends Component {
  constructor (props) {
    super(props)
    const { patients, match } = this.props
    const filteredPatientData = patients.filter(patient => patient.id === parseInt(match.params.patientId))
    // const assignedDoctorData = doctors.filter(doctor => doctor.id === filteredPatientData[0].assigned_doctor)
    // console.log('assign doctor data: ', assignedDoctorData)
    // filteredPatientData[0].assigned_doctor = assignedDoctorData[0]
    // console.log('newest filtered patient data: ', filteredPatientData)
    this.state = {
      patient: {
        email: filteredPatientData[0].email,
        first_name: filteredPatientData[0].first_name,
        last_name: filteredPatientData[0].last_name,
        dob: filteredPatientData[0].dob,
        gender: filteredPatientData[0].gender,
        // assigned_doctor: filteredPatientData[0].assigned_doctor,
        assigned_doctor: filteredPatientData[0].assigned_doctor,
        street_address: filteredPatientData[0].street_address,
        city: filteredPatientData[0].city,
        state: filteredPatientData[0].state,
        zip_code: filteredPatientData[0].zip_code,
        allergies: filteredPatientData[0].allergies,
        status: filteredPatientData[0].status
      }
    }
  }
  handleChange = (event) => {
    const updatedFields = { [event.target.name]: event.target.value }
    // console.log('updatedfield data: ', updatedFields)
    // console.log(this.state.patient)
    this.setState({ patient: updatedFields })
  }
  handleUpdatePatient = (event) => {
    event.preventDefault()
    const { user, setPatientState, msgAlert, match, history } = this.props
    console.log('state data in update patient: ', this.state)
    updatePatient(match.params.patientId, user, this.state)
      .then(() => getPatientsFromApi(user.token))
      .then(patients => setPatientState(patients))
      .then(() => history.push('/patients'))
      .then(() => msgAlert({
        heading: 'Updated Patient Successfully',
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ patient: { email: this.state.patient.email, first_name: this.state.patient.first_name, last_name: this.state.patient.last_name, dob: this.state.patient.dob, assigned_doctor: this.state.patient.assigned_doctor, street_address: this.state.patient.street_address, city: this.state.patient.city, state: this.state.patient.state, allergies: this.state.patient.allergies } })
        msgAlert({
          heading: ' Failed to update a patient, with error: ' + error.message,
          variant: 'danger'
        })
      })
  }
   handleDeletePatient = patientId => {
     const { match, setPatientState, msgAlert, user, history } = this.props
     deletePatient(match.params.patientId, user.token)
       .then(() => getPatientsFromApi(user.token))
       .then((patients) => setPatientState(patients))
       .then(() => history.push('/patients'))
       .then(() => msgAlert({
         heading: 'Deleted Patient Successfully',
         variant: 'success'
       }))
       .catch(error => {
         this.setState({ patient: { email: this.state.patient.email, first_name: this.state.patient.first_name, last_name: this.state.patient.last_name, dob: this.state.patient.dob, assigned_doctor: this.state.patient.assigned_doctor, street_address: this.state.patient.street_address, city: this.state.patient.city, state: this.state.patient.state, allergies: this.state.patient.allergies } })
         msgAlert({
           heading: ' Failed to delete a patient, with error: ' + error.message,
           variant: 'danger'
         })
       })
   }
   render () {
     const { patient } = this.state
     const { doctors } = this.props
     //  const filteredPatientData = patients.filter(patient => patient.id === parseInt(match.params.patientId))
     //  console.log('filteredpatient data: ', filteredPatientData)
     //  const assignedDoctorData = doctors.filter(doctor => doctor.id === filteredPatientData[0].assigned_doctor)
     //  console.log('assigned doctor data: ', assignedDoctorData)
     const doctorDataJsx = doctors.map(doctor => {
       if (patient.assigned_doctor === undefined || patient.assigned_doctor === null) {
         return <option value={patient.assigned_doctor}>Select a Doctor</option>
       }
       return (
         <Fragment key={doctor.id}>
           <option value={doctor.id}>{doctor.first_name} {doctor.last_name} Specialty: {doctor.specialty}</option>
         </Fragment>
       )
     })

     return (
       <Fragment>
         <h3>Patient</h3>
         <Form onSubmit={this.handleUpdatePatient}>
           <Accordion defaultActiveKey='0'>
             <Card>
               <Accordion.Toggle as={Card.Header} eventKey="0">
                Basic Information
               </Accordion.Toggle>
               <Accordion.Collapse eventKey="0">
                 <Card.Body>
                   <Form.Row>
                     <Form.Group
                       as={Col}
                       controlId="first_name"
                     >
                       <Form.Label>First Name</Form.Label>
                       <Form.Control
                         type="text"
                         name='first_name'
                         value={patient.first_name}
                         placeholder='Enter First Name'
                         onChange={this.handleChange} />
                     </Form.Group>

                     <Form.Group as={Col} controlId="last_name">
                       <Form.Label>Last Name</Form.Label>
                       <Form.Control
                         type="text"
                         name='last_name'
                         value={patient.last_name}
                         placeholder='Enter Last Name'
                         onChange={this.handleChange} />
                     </Form.Group>
                   </Form.Row>

                   <Form.Group controlId="street_address">
                     <Form.Label>Street Address</Form.Label>
                     <Form.Control
                       name='street_address'
                       value={patient.street_address}
                       placeholder='Enter Street Address'
                       onChange={this.handleChange} />
                   </Form.Group>

                   <Form.Row>
                     <Form.Group as={Col} controlId="city">
                       <Form.Label>City</Form.Label>
                       <Form.Control
                         type="text"
                         name='city'
                         value={patient.city}
                         placeholder='Enter City'
                         onChange={this.handleChange} />
                     </Form.Group>

                     <Form.Group as={Col} controlId="state">
                       <Form.Label>State</Form.Label>
                       <Form.Control
                         type="text"
                         name='state'
                         value={patient.state}
                         placeholder='Enter State'
                         onChange={this.handleChange} />
                     </Form.Group>

                     <Form.Group as={Col} controlId="zip_code">
                       <Form.Label>Zip</Form.Label>
                       <Form.Control
                         name='zip_code'
                         value={patient.zip_code}
                         placeholder='Enter Zip Code'
                         onChange={this.handleChange} />
                     </Form.Group>
                   </Form.Row>

                   <Form.Row>
                     <Form.Group as={Col} controlId="email">
                       <Form.Label>Email</Form.Label>
                       <Form.Control
                         type="email"
                         name='email'
                         value={patient.email}
                         placeholder='Enter Email'
                         onChange={this.handleChange} />
                     </Form.Group>

                     <Form.Group as={Col} controlId="dob">
                       <Form.Label>Date of Birth</Form.Label>
                       <Form.Control
                         type="text"
                         name='dob'
                         value={patient.dob}
                         placeholder='Enter Date of Birth'
                         onChange={this.handleChange} />
                     </Form.Group>
                   </Form.Row>

                   <Form.Row>
                     <Form.Group as={Col} controlId="allergies">
                       <Form.Label>Allergies</Form.Label>
                       <Form.Control
                         name='allergies'
                         value={patient.allergies}
                         type="text"
                         placeholder='Enter allergies'
                         onChange={this.handleChange} />
                     </Form.Group>
                     <Form.Group as={Col} controlId="assigned_doctor">
                       <Form.Label className="my-1 mr-2">
                Assigned Doctor
                       </Form.Label>
                       <Form.Control
                         as='select'
                         className="my-1 mr-sm-2"
                         name='assigned_doctor'
                         value={patient.assigned_doctor}
                         type="text"
                         onChange={this.handleChange}
                       >
                         {/* <option value={patient.assigned_doctor.id}>Dr. {patient.assigned_doctor.first_name} {patient.assigned_doctor.last_name} Specialty: {patient.assigned_doctor.specialty}</option> */}
                         {doctorDataJsx}
                       </Form.Control>
                     </Form.Group>
                   </Form.Row>
                   {/* <Button
                     variant="primary"
                     type="submit"
                   >
            Update Profile
                   </Button>
                   <Button
                     type='button'
                     variant='danger'
                     onClick={this.handleDeletePatient}
                   >
            Delete Patient
                   </Button> */}
                 </Card.Body>
               </Accordion.Collapse>
             </Card>
           </Accordion>
           <Button
             variant="primary"
             type="submit"
           >
            Update Profile
           </Button>
           <Button
             type='button'
             variant='danger'
             onClick={this.handleDeletePatient}
           >
            Delete Patient
           </Button>

         </Form>
       </Fragment>
     )
   }
}

export default withRouter(PatientProfile)
