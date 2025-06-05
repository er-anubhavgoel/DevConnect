import axios from "axios";
import { api, API_BASE_URL } from "../../config/api";
import {
  GET_PROFILE_BY_ID_FAILURE,
  GET_PROFILE_BY_ID_REQUEST,
  GET_PROFILE_BY_ID_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SEARCH_USER_FAILURE,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from "./auth.actionType";

// ------------------ LOGIN with Enhanced Debugging ------------------
export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const payload = {
      email: loginData.email,
      password: loginData.password,
    };
    console.log("🚀 Sending login request:", {
      url: `${API_BASE_URL}/auth/signin`,
      payload: payload,
    });
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("✅ Login Response:", data);
    if (data.token) {
      localStorage.setItem("jwt", data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: data.token });
      dispatch(getProfileAction(data.token));
    } else {
      throw new Error("Token missing in response");
    }
  } catch (error) {
    console.error("❌ LOGIN ERROR DETAILS:");
    console.error("Status:", error.response?.status);
    console.error("Response Data:", error.response?.data);
    console.error("Full Error:", error);
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ------------------ REGISTER ------------------
export const registerUserAction = (registerData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      registerData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ Register Response:", data);
    if (data.token) {
      localStorage.setItem("jwt", data.token);
      dispatch({ type: REGISTER_SUCCESS, payload: data.token });
      dispatch(getProfileAction(data.token));
    } else {
      throw new Error("Token missing in response");
    }
  } catch (error) {
    console.error("❌ Register Error:", error.response?.data || error.message);
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ------------------ GET PROFILE ------------------
export const getProfileAction = (jwt) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });
  try {
    const token = jwt || localStorage.getItem("jwt");
    console.log(
      "🔍 Getting profile with token:",
      token ? "Token exists" : "No token"
    );

    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("👤 Profile fetched:", data);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.error(
      "❌ Get Profile Error:",
      error.response?.data || error.message
    );
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ------------------ UPDATE PROFILE ------------------
export const updateProfileAction = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });
  const token = localStorage.getItem("jwt");

  try {
    const { data } = await axios.put(
      `${API_BASE_URL}/api/users`, // Correct endpoint!
      reqData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Profile Updated Successfully:", data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });

    dispatch(getProfileAction(token));

    return data;
  } catch (error) {
    console.error("❌ Update Profile Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });

    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};

// ------------------ SEARCH USER ------------------
export const searchUser = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });
  try {
    const { data } = await api.get(`/api/users/search?query=${query}`);
    console.log("Search User--->", data);

    dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
  } catch (error) {
    console.error(error.response?.data || error.message);
    dispatch({
      type: SEARCH_USER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ------------------ GET User PROFILE by ID ------------------
export const getProfileByIdAction = (id) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_BY_ID_REQUEST });
  try {
    const token = localStorage.getItem("jwt");
    console.log(
      "🔍 Getting profile with token:",
      token ? "Token exists" : "No token"
    );

    const { data } = await axios.get(`${API_BASE_URL}/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("👤 Profile by ID fetched:", data);
    dispatch({ type: GET_PROFILE_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.error(
      "❌ Get Profile Error:",
      error.response?.data || error.message
    );
    dispatch({
      type: GET_PROFILE_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ------------------ Follow/Unfollow User ------------------
export const followUserAction = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.put(
      `${API_BASE_URL}/api/users/${id}`,
      {}, // PUT body is empty
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(getProfileByIdAction(id)); // Refresh viewed profile
    dispatch(getProfileAction(token)); // Optional: Refresh self

    return data;
  } catch (error) {
    console.error(
      "❌ Follow User Error:",
      error.response?.data || error.message
    );
  }
};
