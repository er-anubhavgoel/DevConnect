import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  SEARCH_USER_SUCCESS,
  GET_PROFILE_BY_ID_SUCCESS,
  GET_PROFILE_BY_ID_REQUEST,
  GET_PROFILE_BY_ID_FAILURE,
} from "./auth.actionType";

const initialState = {
  jwt: null,
  error: null,
  loading: false,
  user: null,
  profileById: null,
  searchUser: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_PROFILE_REQUEST:
    case GET_PROFILE_BY_ID_REQUEST:
    case UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_PROFILE_SUCCESS:
      return { ...state, user: action.payload, error: null, loading: false };

    case GET_PROFILE_BY_ID_SUCCESS:
      return {
        ...state,
        profileById: action.payload,
        error: null,
        loading: false,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, jwt: action.payload, loading: false, error: null };

    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        searchUser: action.payload,
        loading: false,
        error: null,
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_PROFILE_FAILURE:
    case GET_PROFILE_BY_ID_FAILURE:
    case UPDATE_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
