import axios from "axios";
import { api } from "../../config/api";
import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_USERS_POST_FAILURE,
  GET_USERS_POST_REQUEST,
  GET_USERS_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from "./post.actionType";

export const createPostAction = (postData) => async (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });

  try {
    const { data } = await api.post("/api/posts", postData);
    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    console.log("Created post: ", data);
  } catch (error) {
    console.log("Error: ", error);
    dispatch({
      type: CREATE_POST_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getAllPostAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POST_REQUEST });

  try {
    const { data } = await api.get("/api/posts");
    dispatch({ type: GET_ALL_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: GET_ALL_POST_FAILURE, payload: data });
  }
};

export const getUsersPostAction = (userId) => async (dispatch) => {
  dispatch({ type: GET_USERS_POST_REQUEST });

  try {
    const { data } = await api.get(`/api/posts/user/${userId}`);
    dispatch({ type: GET_USERS_POST_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error: ", error);
    dispatch({
      type: GET_USERS_POST_FAILURE, // Fixed: was using CREATE_POST_FAILURE
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const likePostAction = (postId) => async (dispatch) => {
  try {
    dispatch({ type: LIKE_POST_REQUEST });
    const { data } = await api.put(`/api/posts/like/${postId}`);
    dispatch({
      type: LIKE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIKE_POST_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createCommentAction = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_COMMENT_REQUEST });

  try {
    if (!reqData.postId) {
      throw new Error("Post ID is required");
    }

    const { data } = await api.post(
      `/api/comments/post/${reqData.postId}`,
      reqData.data
    );
    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
    console.log("Created Comment: ", data);
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: CREATE_COMMENT_FAILURE, payload: error.message });
  }
};

export const deletePostAction = (postId) => async (dispatch) => {
  dispatch({ type: DELETE_POST_REQUEST });

  try {
    const { data } = await api.delete(`/api/posts/${postId}`);
    dispatch({ type: DELETE_POST_SUCCESS, payload: postId });
    console.log("Deleted Post:", data);
  } catch (error) {
    console.log("Error deleting post:", error);
    dispatch({
      type: DELETE_POST_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
