import apiUrl from '../apiConfig'
import axios from 'axios'

// Get all patients
export const getPatientsFromApi = token => {
  return axios({
    url: apiUrl + '/patients/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
}

export const createPatient = (data, user) => {
  console.log('right before api call: ', data)
  return axios({
    url: apiUrl + '/patients/',
    method: 'POST',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      patient: {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        dob: data.dob,
        assigned_doctor: data.assignedDoctor
        // zip_code: data.zip_code
      }
    }
  })
}

export const deletePatient = (patientId, token) => {
  return axios({
    url: apiUrl + `/patients/${patientId}/`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
}

export const updatePatient = (patientId, user, data) => {
  console.log('data passed to api call: ', data.patient)
  // for (const key in data.patient) {
  //   if (data.patient[key].length === 0) {
  //     console.log('key being deleted: ', data.patient)
  //     delete data.patient[key]
  //   }
  // }
  console.log('before api call: ', data.patient)
  return axios({
    url: `${apiUrl}/patients/${patientId}/`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: { patient: data.patient }
  })
}
