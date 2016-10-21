import { 
  LOGIN_REQUEST,
  LOGIN_DENIED,
  LOGIN_SUCCESS
} from '../constants/Login'

const initialState = {
  fetching: false,
  denied: false,
  logged: false
}

export default function login(state = initialState, action) {
   switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, denied: false, fetching: true, logged: false }

    case LOGIN_DENIED:
      return { ...state, denied: true, fetching: false, logged: false }

    case LOGIN_SUCCESS:
      return { ...state, denied: false, fetching: false, logged: true }

    default:
      return state;
  }
}

