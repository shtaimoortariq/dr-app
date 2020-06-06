import { actionsTypes } from './../actions/actionsTypes'

const initData = {
  addPatientInfo: {
    success: false,
    data: null,
    error: null
  },

  addPatientHealthInfo:{
    success: false,
    data: null,
    error: null
  },

  getPatientHealthInfo:{
    success: false,
    data: null,
    error: null
  }
}

export default function (state = initData, action) {
  switch (action.type) {
    case actionsTypes.SET_PATIENT_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        addPatientInfo: {
            success: true,
            data: action.data,
            error: null
          }
      }
    case actionsTypes.SET_PATIENT_PERSONAL_INFO_FAILURE:
      return {
        ...state,
        addPatientInfo: {
            success: false,
            data: null,
            error: action.error
          }
      }
      case actionsTypes.SET_PATIENT_HEALTH_INFO_SUCCESS:
        return {
          ...state,
          addPatientHealthInfo: {
              success: true,
              data: action.data,
              error: null
            }
        }
      case actionsTypes.SET_PATIENT_HEALTH_INFO_FAILURE:
        return {
          ...state,
          addPatientHealthInfo: {
              success: false,
              data: null,
              error: action.error
            }
        }
        case actionsTypes.GET_PATIENT_HEALTH_RECORD_SUCCESS:
        return {
          ...state,
          getPatientHealthInfo: {
              success: true,
              data: action.data,
              error: null
            }
        }
      case actionsTypes.GET_PATIENT_HEALTH_RECORD_FAILURE:
        return {
          ...state,
          getPatientHealthInfo: {
              success: false,
              data: null,
              error: action.error
            }
        }
      case actionsTypes.CLEAR_PATIENT_HEALTH_INFO:
          return {
            ...state,
            addPatientHealthInfo: {
                success: true,
                data: null,
                error: null
              }
          }
    default:
      return {
        ...state
      }
  }
}
