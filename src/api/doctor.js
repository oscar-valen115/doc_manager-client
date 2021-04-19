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
