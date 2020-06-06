import { actionsTypes } from './../actions/actionsTypes'

const initData = {
  patients: {
    success: false,
    data: null,
    error: null
  }
}

export default function (state = initData, action) {
  switch (action.type) {
    case actionsTypes.GET_PATIENTS_SUCCESS:
      return {
        ...state,
        patients: {
            success: true,
            data: action.data,
            error: null
          }
      }
    case actionsTypes.GET_PATIENTS_FAILURE:
      return {
        ...state,
        patients: {
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
