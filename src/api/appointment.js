import apiUrl from '../apiConfig'
import axios from 'axios'

// Get all patients
export const getAppointmentsFromApi = token => {
  return axios({
    url: `${apiUrl}/appointments/`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
}

export const createAppointment = (data, token) => {
  return axios({
    url: `${apiUrl}/appointments/`,
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`
    },
    data: data
  })
}

export const updateAppointment = (appointmentId, data, token) => {
  return axios({
    url: `${apiUrl}/appointments/${appointmentId}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${token}`
    },
    data: data
  })
}
