import {
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
  GET_USERS_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from "./post.actionType";

const initialState = {
  post: null,
  loading: false,
  error: null,
  posts: [],
  userPosts: [],
  userReels: [],
  savedPosts: [],
  like: null,
  comments: [],
  newComment: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
    case GET_ALL_POST_REQUEST:
    case LIKE_POST_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        posts: [action.payload, ...state.posts],
        loading: false,
        error: null,
      };

    case GET_ALL_POST_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };

    case GET_USERS_POST_SUCCESS:
      return {
        ...state,
        userPosts: action.payload,
        loading: false,
        error: null,
      };

    case LIKE_POST_SUCCESS:
      return {
        ...state,
        like: action.payload,
        posts: state.posts.map((item) => {
          const itemId = item.id || item._id || item.postId;
          const payloadId =
            action.payload.id || action.payload._id || action.payload.postId;

          return itemId === payloadId ? action.payload : item;
        }),
        loading: false,
        error: null,
      };

    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...(state.comments || []), action.payload],
        posts: state.posts.map((post) => {
          const postId = post.id || post.postId;
          const commentPostId =
            action.payload.post?.id ||
            action.payload.post?.postId ||
            action.payload.postId;

          if (postId === commentPostId) {
            return {
              ...post,
              comments: [...(post.comments || []), action.payload],
            };
          }
          return post;
        }),
        loading: false,
        error: null,
        newComment: action.payload,
      };

    case CREATE_POST_FAILURE:
    case GET_ALL_POST_FAILURE:
    case LIKE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(
          (post) =>
            post.id !== action.payload &&
            post._id !== action.payload &&
            post.postId !== action.payload
        ),
        loading: false,
        error: null,
      };

    case DELETE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
