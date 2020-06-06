import { actionsTypes } from './actionsTypes'
import request from './request'


export const getPatients = payload => dispatch => {
    return new Promise((resolve,reject)=>{
        request
          .get(`/patient`)
          .then(({ data }) => {
            // localStorage.setItem('PAU',data);
            dispatch({
              type: actionsTypes.GET_PATIENTS_SUCCESS,
              data: data ? JSON.parse(data) : {}
            })
            resolve(data ? JSON.parse(data) : {})
          })
          .catch(({ response }) => {
            // if(response){
            const error = response ?  JSON.parse(response.data) : {message:'unknown error occured'}
            dispatch({
              type: actionsTypes.GET_PATIENTS_FAILURE,
              error :  error
            });
            reject(error);
        // }
          });
      })
  }



// export const getPatientHealtRecord = payload => dispatch => {
//     return new Promise((resolve,reject)=>{
//         request
//           .post(`/patient`,payload)
//           .then(({ data }) => {
//             localStorage.setItem('PAU',data);
//             dispatch({
//               type: actionsTypes.GET_PATIENT_HEALTH_RECORD_SUCCESS,
//               data: data
//             })
//             resolve(data)
//           })
//           .catch(({ response }) => {
//             const error = JSON.parse(response.data)
//             dispatch({
//               type: actionsTypes.GET_PATIENT_HEALTH_RECORD_FAILURE,
//               error :  error ? error : {}
//             });
//             reject(response);
//           });
//       })
//   }