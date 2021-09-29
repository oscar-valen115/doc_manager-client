import apiUrl from '../apiConfig'
import axios from 'axios'

// Get all patients
export const getDoctorsFromApi = token => {
  return axios({
    url: apiUrl + '/doctors/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
}

export const createDoctor = (data, user) => {
  console.log('data info: ', data)
  console.log('user info: ', user)
  return axios({
    url: apiUrl + '/doctors/',
    method: 'POST',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      doctor: {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        specialty: data.specialty
      }
    }
  })
}

export const deleteDoctor = (doctorId, token) => {
  return axios({
    url: apiUrl + `/doctors/${doctorId}/`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
}

export const updateDoctor = (doctorId, token, data) => {
  console.log('data before API call: ', data)
  return axios({
    url: `${apiUrl}/doctors/${doctorId}/`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${token}`
    },
    data: { doctor: data.doctor }
  })
}
