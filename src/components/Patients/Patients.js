import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
// import _ from 'lodash'
// import Moment from 'react-moment'
// import styled from 'styled-components'

class Patients extends Component {
  render () {
    const { patients } = this.props
    console.log('patients prop data: ', patients)
    return (
      <Fragment>
        <div>Patients Page</div>
      </Fragment>
    )
  }
}

export default withRouter(Patients)
