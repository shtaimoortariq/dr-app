import { actionsTypes } from './../actions/actionsTypes'

const initData = {
  currentUser: {
    success: false,
    data: null,
    error: null
  },

  updateCurrentUser:{
    success: false,
    data: null,
    error: null
  }

}

export default function (state = initData, action) {
  switch (action.type) {
    case actionsTypes.GET_DOCTOR_PROFILE_SUCCESS:
      return {
        ...state,
        currentUser: {
            success: true,
            data: action.data,
            error: null
          }
      }
    case actionsTypes.GET_DOCTOR_PROFILE_FAILURE:
      return {
        ...state,
        currentUser: {
            success: false,
            data: null,
            error: action.error
          }
      }
      case actionsTypes.UPDATE_DOCTOR_PROFILE_SUCCESS:
      return {
        ...state,
        updateCurrentUser: {
            success: true,
            data: action.data,
            error: null
          }
      }
    case actionsTypes.UPDATE_DOCTOR_PROFILE_FAILURE:
      return {
        ...state,
        updateCurrentUser: {
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
