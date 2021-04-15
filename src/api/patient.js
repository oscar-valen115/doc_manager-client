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

export const createPatient = (passwords, user) => {
  return axios({
    url: apiUrl + '/patients/',
    method: 'POST',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      patient: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}
