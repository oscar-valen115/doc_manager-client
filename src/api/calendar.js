import apiUrl from '../apiConfig'
import axios from 'axios'

// Get calendar data for a month
export const getCalendarDataFullYear = token => {
  return axios({
    url: apiUrl + '/calendar/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`
    }
  })
}
