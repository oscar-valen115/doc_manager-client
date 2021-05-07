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
  console.log('data value: \n', data)
  console.log('user values: \n', user)
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

export const updatePatient = (patientId, token, data) => {
  return axios({
    url: `${apiUrl}/patients/${patientId}/`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${token}`
    },
    data: {
      patient: {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        dob: data.dob,
        assigned_doctor: data.assignedDoctor,
        street_address: data.street_address,
        city: data.city,
        allergies: data.allergies
      }
    }
  })
}
