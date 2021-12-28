import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

class Doctors extends Component {
  render () {
    const { doctors } = this.props
    const doctorsJsx = (
      doctors.map(doctor => (
        <Fragment key={doctor.id}>
          <tr>
            <td>{doctor.id}</td>
            <td>{doctor.first_name}</td>
            <td>{doctor.last_name}</td>
            <td>{doctor.email}</td>
            <td>{doctor.specialty}</td>
            <td>
              <Link to={`/doctors/${doctor.id}`}>View</Link>
            </td>
          </tr>
        </Fragment>
      )))

    return (
      <Fragment>
        <Row>
          <div>
            <h3>Doctors</h3>
          </div>
          <div className='ml-auto'>
            {/* <i className="fas fa-user-plus"></i> */}
            <Button
              variant='outline-success'
              href='#create-doctor'
            >
              <FontAwesomeIcon className='mr-1' icon={faUserPlus} />
              New Doctor
            </Button>
          </div>
        </Row>
        <hr></hr>
        <Row>
          <Table borderless striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Specialty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctorsJsx}
            </tbody>
          </Table>
        </Row>
      </Fragment>
    )
  }
}

export default withRouter(Doctors)
