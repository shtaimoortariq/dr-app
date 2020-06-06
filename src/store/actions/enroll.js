import { actionsTypes } from './actionsTypes'
import request from './request'


export const setPatientPersonalInfo = payload => dispatch => {
    return new Promise((resolve,reject)=>{
        request
          .post('/patient',payload)
          .then(({ data }) => {
            dispatch({
              type: actionsTypes.SET_PATIENT_PERSONAL_INFO_SUCCESS,
              data: JSON.parse(data)
            })
            resolve(JSON.parse(data))
          })
          .catch(({ response }) => {
              const error = response ?  response : {message:"unknown error"}
            dispatch({
              type: actionsTypes.SET_PATIENT_PERSONAL_INFO_FAILURE,
              error :  error ? error : {}
            });
            reject(response);
          });
      })
  }

  export const setPatientHealthInfo = payload => dispatch => {
    return new Promise((resolve,reject)=>{
        request
          .post(`/patient/${payload.user_info.id}/healthrecord`,payload)
          .then(({ data }) => {
            dispatch({
              type: actionsTypes.SET_PATIENT_HEALTH_INFO_SUCCESS,
              data: JSON.parse(data)
            })
            resolve(JSON.parse(data))
          })
          .catch(({ response }) => {
              const error = response ?  response : {message:"unknown error"}
            dispatch({
              type: actionsTypes.SET_PATIENT_HEALTH_INFO_FAILURE,
              error :  error ? error : {}
            });
            reject(response);
          });
      })
  }

  export const getPatientHealthInfo = payload => dispatch => {
    return new Promise((resolve,reject)=>{
      request
        .get(`/patient/${payload.id}`)
        .then(({ data }) => {
          dispatch({
            type: actionsTypes.GET_PATIENT_HEALTH_RECORD_SUCCESS,
            data: JSON.parse(data)
          })
          resolve(JSON.parse(data))
        })
        .catch(({ response }) => {
          if(response.status === 300){
            dispatch({
              type: actionsTypes.GET_PATIENT_HEALTH_RECORD_SUCCESS,
              data: JSON.parse(response.data)
            })
            resolve(JSON.parse(response.data))
          }else{
            const error = response ?  JSON.parse(response.data) : {message:"unknown error"}
            dispatch({
              type: actionsTypes.GET_PATIENT_HEALTH_RECORD_FAILURE,
              error :  error 
            });
            reject(error);
          } 
        });
    })
  }