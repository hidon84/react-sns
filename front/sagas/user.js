import {
  all,
  fork,
  takeLatest,
  put,
  take,
  takeEvery,
  call
} from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from '../reducers/user';

function loginAPI() {}
function* login() {
  try {
    yield call(loginAPI);
    yield put({
      type: LOG_IN_SUCCESS
    });
  } catch (e) {
    console.error(e);
    yield put({ type: LOG_IN_FAILURE });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
  //   while (true) {
  //     yield take(LOG_IN);
  //     yield put({ type: LOG_IN_SUCCESS });
  //   }
}
function* signUp() {
  try {
    yield call(signUpAPI);
    throw new Error(' 에렁임');
    yield put({ type: SIGN_UP_SUCCESS });
  } catch (e) {
    yield put({ type: SIGN_UP_FAILURE, error: e });
  }
}
function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}
export default function* userSaga() {
  yield all([watchLogin(), watchSignUp()]);
}
