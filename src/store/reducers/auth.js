import { actionsTypes } from './../actions/actionsTypes'

const initData = {
  login: {
    success: false,
    data: null,
    error: null
  },
  signup: {
    success: false,
    data: null,
    error: null
  }
}

export default function (state = initData, action) {
  switch (action.type) {
    case actionsTypes.LOGIN:
      return {
        ...state,
        login: {
          success: false,
          data: {},
          error: null
        }
      }
    case actionsTypes.LOGIN_SUCCESS:
      return {
        ...state,
        login: {
            success: true,
            data: action.data,
            error: null
          }
      }
    case actionsTypes.LOGIN_FAILURE:
      return {
        ...state,
        login: {
            success: false,
            data: null,
            error: action.error
          }
      }
    case actionsTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
            success: true,
            data: action.data,
            error: null
          }
      }
    case actionsTypes.SIGNUP_FAILURE:
      return {
        ...state,
        signup: {
            success: false,
            data: null,
            error: action.error
          }
      }
      case actionsTypes.LOGOUT:
        localStorage.removeItem('PAU')
        return state = initData

    default:
      return {
        ...state
      }
  }
}
