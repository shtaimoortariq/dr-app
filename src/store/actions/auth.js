import { actionsTypes } from './actionsTypes'
import request from './request'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const login = payload => dispatch => {
    return new Promise((resolve,reject)=>{
        request
          .post(`/auth/login`,payload)
          .then(({ data }) => {
            let resp  = JSON.parse(data);
            cookies.set('patientToken', `${resp.authtoken}`, { path: '/' });
            localStorage.setItem('PAU', JSON.stringify(resp.id));            dispatch({
              type: actionsTypes.LOGIN_SUCCESS,
              data: data
            })
            resolve(data)
          })
          .catch(({ response }) => {
            const error = response ? JSON.parse(response.data) : {message:'unknown error occured'}
            dispatch({
              type: actionsTypes.LOGIN_FAILURE,
              error :  error
            });
            reject(error);
          });
      })
  }


export const signup = payload => dispatch => {
  return new Promise((resolve,reject)=>{
      request
        .post(`/doctor`,payload)
        .then(({ data }) => {
          localStorage.setItem('PAU',data);
          dispatch({
            type: actionsTypes.SIGNUP_SUCCESS,
            data: data
          })
          resolve(data)
        })
        .catch(({ response }) => {
          const error = response ? JSON.parse(response.data) : {message:'unkown error occured'}
          dispatch({
            type: actionsTypes.SIGNUP_FAILURE,
            error :  error
          });
          reject(error);
        });
    })
}

  export const LogOut = () => {
    return {
    type:  actionsTypes.LOGOUT
    }
  }