import { actionsTypes } from './../actions/actionsTypes'

const initData = {
  health: {
    success: false,
    data: null,
    error: null
  }
}

export default function (state = initData, action) {
  switch (action.type) {
    case actionsTypes.GET_HEALTH_SUCCESS:
      return {
        ...state,
        health: {
            success: true,
            data: action.data,
            error: null
          }
      }
    case actionsTypes.GET_HEALTH_FAILURE:
      return {
        ...state,
        health: {
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
