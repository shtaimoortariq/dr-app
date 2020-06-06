import { actionsTypes } from './actionsTypes'
import request from './request'

export const getHistory = payload => dispatch => {
  return new Promise((resolve, reject) => {
    request
      .get(`/patient/${payload.id}/history`)
      .then(({ data }) => {
        dispatch({
          type: actionsTypes.GET_HISTORY_SUCCESS,
          data: data ? JSON.parse(data).history : {}
        })
        resolve(data)
      })
      .catch(({ response }) => {
        
        const error = response ? JSON.parse(response.data) : { message: 'unknown error' }
        dispatch({
          type: actionsTypes.GET_HISTORY_FAILURE,
          error: error ? error : {}
        })
        reject(error)
      })
  })
}

export const uploadPatientHistory = (payload,patientId,document_id) => dispatch => {
  return new Promise((resolve, reject) => {
    request
      .post(`/patient/${patientId}/history/${document_id}`,payload)
      .then(({ data }) => {
        dispatch({
          type: actionsTypes.UPLOAD_PATIENT_HISTORY_SUCCESS,
          data: data ? JSON.parse(data) : {}
        })
        resolve(data)
      })
      .catch(({ response }) => {
        const error = response ? JSON.parse(response.data) : { message: 'unknown error' }
        dispatch({
          type: actionsTypes.UPLOAD_PATIENT_HISTORY_FAILURE,
          error: error 
        })
        reject(error)
      })
  })
}

export const addPatientHistory = (payload,patientId) => dispatch => {
  return new Promise((resolve, reject) => {
    request
      .post(`/patient/${patientId}/history`,payload)
      .then(({ data }) => {
        dispatch({
          type: actionsTypes.ADD_PATIENT_HISTORY_SUCCESS,
          data: data ? JSON.parse(data) : {}
        })
        resolve(data)
      })
      .catch(({ response }) => {
        const error = response ? JSON.parse(response.data) : { message: 'unknown error' }
        dispatch({
          type: actionsTypes.ADD_PATIENT_HISTORY_FAILURE,
          error: error
        })
        reject(error)
      })
  })
}
