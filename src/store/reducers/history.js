import { actionsTypes } from './../actions/actionsTypes'

const initData = {
  history: {
    success: false,
    data: null,
    error: null
  },

  uploadHistory: {
    success: false,
    data: null,
    error: null
  },

  addHistory: {
    success: false,
    data: null,
    error: null
  }
}

export default function (state = initData, action) {
  switch (action.type) {
    case actionsTypes.GET_HISTORY_SUCCESS:
      return {
        ...state,
        history: {
          success: true,
          data: action.data,
          error: null
        }
      }
    case actionsTypes.GET_HISTORY_FAILURE:
      return {
        ...state,
        history: {
          success: false,
          data: null,
          error: action.error
        }
      }
    case actionsTypes.UPLOAD_PATIENT_HISTORY_SUCCESS:
      return {
        ...state,
        uploadHistory: {
          success: true,
          data: action.data,
          error: null
        }
      }
    case actionsTypes.UPLOAD_PATIENT_HISTORY_FAILURE:
      return {
        ...state,
        uploadHistory: {
          success: false,
          data: null,
          error: action.error
        }
      }
    case actionsTypes.ADD_PATIENT_HISTORY_SUCCESS:
      return {
        ...state,
        addHistory: {
          success: true,
          data: action.data,
          error: null
        }
      }
    case actionsTypes.ADD_PATIENT_HISTORY_FAILURE:
      return {
        ...state,
        addHistory: {
          success: false,
          data: null,
          error: action.error
        }
      }
    default:
      return {
        ...state
      }
  }
}
