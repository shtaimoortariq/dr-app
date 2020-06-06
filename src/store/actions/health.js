import { actionsTypes } from './actionsTypes'
import request from './request'


export const getHealth = payload => dispatch => {
    return new Promise((resolve,reject)=>{
        request
          .get(`/patient/${payload.id}`)
          .then(({ data }) => {
            console.log("success response of login =>",data);
            dispatch({
              type: actionsTypes.GET_HEALTH_SUCCESS,
              data: JSON.parse(data)
            })
            resolve(JSON.parse(data))
          })
          .catch(({ response }) => {
            if(response.status === 300){
              dispatch({
                type: actionsTypes.GET_HEALTH_SUCCESS,
                data: JSON.parse(response.data)
              })
              resolve(JSON.parse(response.data))
            }else{
              const error = response ?  JSON.parse(response.data) : {message:"unknown error"}
              dispatch({
                type: actionsTypes.GET_HEALTH_FAILURE,
                error :  error 
              });
              reject(error);
            }
              
          });
      })
  }