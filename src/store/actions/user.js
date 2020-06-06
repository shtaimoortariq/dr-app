import { actionsTypes } from './actionsTypes'
import request from './request'

export const getUserProfile = payload => dispatch => {
  return new Promise((resolve, reject) => {
    request
      .get(`/doctor/${payload.id}`)
      .then(({ data }) => {
        dispatch({
          type: actionsTypes.GET_DOCTOR_PROFILE_SUCCESS,
          data: data ? JSON.parse(data) : {}
        })
        resolve(data)
      })
      .catch(({ response }) => {
        const error = response ? JSON.parse(response.data) : { message: 'unknown error' }
        dispatch({
          type: actionsTypes.GET_DOCTOR_PROFILE_FAILURE,
          error: error
        })
        reject(error)
      })
  })
}

export const updateCurrentUserProfile = payload => dispatch => {
  return new Promise((resolve, reject) => {
    request
      .post(`/doctor/${payload.id}`)
      .then(({ data }) => {
        dispatch({
          type: actionsTypes.UPDATE_DOCTOR_PROFILE_SUCCESS,
          data: data ? JSON.parse(data) : {}
        })
        resolve(data)
      })
      .catch(({ response }) => {
        const error = response ? JSON.parse(response.data) : { message: 'unknown error' }
        dispatch({
          type: actionsTypes.UPDATE_DOCTOR_PROFILE_FAILURE,
          error: error
        })
        reject(error)
      })
  })
}
