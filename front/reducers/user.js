import { min } from 'moment';

const dummyUser = {
  nicname: ' 제로초',
  Post: [],
  Followers: [],
  Followings: []
};
export const initialState = {
  isLoggedIn: false, //로그인여부
  isLoggingOut: false, // 로그아웃 시도중
  isLogginIn: false, //로그인 시도중
  loginErrorReason: '', //로그인 에러
  signUp: false, //회원가입성공
  isSigningUp: false, //회원가입시도중
  signUpErrorReason: '', //회원가입실패사유
  me: null, //내정보
  followingList: [], //팔로우리스트
  followerList: [], //팔로워리스트
  userInfo: null //남의정보
};
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'; //액션의 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'; //액션의 이름
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'; //액션의 이름

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'; //액션의 이름
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'; //액션의 이름
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE'; //액션의 이름

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'; //액션의 이름
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'; //액션의 이름
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'; //액션의 이름

export const LOAD_FOLLOW_REQUEST = 'LOAD_FOLLOW_REQUEST'; //액션의 이름
export const LOAD_FOLLOW_SUCCESS = 'LOAD_FOLLOW_SUCCESS'; //액션의 이름
export const LOAD_FOLLOW_FAILURE = 'LOAD_FOLLOW_FAILURE'; //액션의 이름

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST'; //액션의 이름
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS'; //액션의 이름
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE'; //액션의 이름

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST'; //액션의 이름
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS'; //액션의 이름
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE'; //액션의 이름

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST'; //액션의 이름
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS'; //액션의 이름
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE'; //액션의 이름

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
// export const signupAction = data => {
//   return {
//     type: SIGN_UP_REQUEST,
//     data: data
//   };
// };
// export const loginRequestAction = {
//   type: LOG_IN_REQUEST
// };
// export const logoutRequestAction = {
//   type: LOG_OUT_REQUEST
// };
export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state,

        isLoggingIn: true
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: dummyUser,
        isLoading: false
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        loginErrorReason: action.error,
        me: null
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoggedIn: false,
        me: null
      };
    }
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        isSignedUp: false
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isSigningUp: false,
        isSignedUp: true,
        signUpErrorReason: ''
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        isSigningUp: false,
        isSignedUp: false,
        signUpErrorReason: action.error
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};
