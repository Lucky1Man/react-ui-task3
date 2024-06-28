import axios from 'misc/requests';
import config from '../../config';
import storage, { keys } from 'misc/storage';
import {
  ERROR_SIGN_IN,
  ERROR_SIGN_UP,
  RECEIVE_USER,
  REQUEST_SIGN_IN,
  REQUEST_SIGN_OUT,
  REQUEST_SIGN_UP,
  REQUEST_USER,
  SUCCESS_SIGN_IN,
  SUCCESS_SIGN_UP,
  ERROR_REQUEST_USER
} from '../constants/actionTypes';

import * as pages from 'constants/pages';
import pageURLs from 'constants/pagesURLs';

const MOCK_USER_AUTH = {
  login: 'admin',
  password: '21232f297a57a5a743894a0e4a801fc3' // admin
};

const MOCK_USER_AUTH_RESPONSE = {
  user: {
    authorities: ['ENABLE_SEE_SECRET_PAGE'],
    email: 'adminMail@gmail.com',
    firstName: 'Адмiнич',
    id: '123',
    lastName: 'Адмiнченко',
    login: 'admin',
  },
  token: {
    expirationTimestamp: 1714304134,
    value: 'someJWTToken',
  }
};

const receiveUser = (user) => ({
  payload: user,
  type: RECEIVE_USER,
});

const requestUser = () => ({
  type: REQUEST_USER,
});

const errorRequestUser = () => ({
  type: ERROR_REQUEST_USER,
});

const errorSignIn = (errors) => ({
  payload: errors,
  type: ERROR_SIGN_IN,
});

const requestSignIn = () => ({
  type: REQUEST_SIGN_IN,
});

const successSignIn = (user) => ({
  payload: user,
  type: SUCCESS_SIGN_IN,
});

const errorSignUp = (errors) => ({
  payload: errors,
  type: ERROR_SIGN_UP,
});

const requestSignUp = () => ({
  type: REQUEST_SIGN_UP,
});

const successSignUp = () => ({
  type: SUCCESS_SIGN_UP,
});

const requestSignOut = () => ({
  type: REQUEST_SIGN_OUT,
});

const getUser = () => {
  const {
    USERS_SERVICE,
  } = config;
  return axios.get(`${USERS_SERVICE}/api/profile`);
};

const signIn = ({
  email,
  login,
  password,
}) => {
  const {
    USERS_SERVICE,
  } = config;
  return axios.post(
    `${USERS_SERVICE}/user/signIn`,
    {
      email,
      login,
      password,
    },
  );
};

const signUp = ({
  email,
  firstName,
  lastName,
  login,
  password,
}) => {
  const {
    USERS_SERVICE,
  } = config;
  return axios.post(
    `${USERS_SERVICE}/user/signUp`,
    {
      email,
      firstName,
      lastName,
      login,
      password,
    },
  );
};

const fetchRefreshToken = () => (dispatch) => {

};

const fetchSignIn = ({
  email,
  login,
  password,
}) => (dispatch) => {
  dispatch(requestSignIn());
  return signIn({
    email,
    login,
    password,
  })
    .catch(() => {
      // TODO: Mocked '.catch()' section
      if (login === MOCK_USER_AUTH.login && password === MOCK_USER_AUTH.password) {
        return MOCK_USER_AUTH_RESPONSE;
      }
      return Promise.reject([
        {
          code: 'WRONG_LOGIN_OR_PASSWORD',
        },
      ]);
    })
    .then(({ token, user }) => {
      storage.setItem(keys.TOKEN, token.value);
      storage.setItem(keys.TOKEN_EXPIRATION, token.expirationTimestamp);
      storage.setItem('USER', JSON.stringify(user)); // TODO: mocked code
      dispatch(successSignIn(user));
    }).catch((errors) => dispatch(errorSignIn(errors)));
};

const fetchSignOut = () => (dispatch) => {
  storage.removeItem(keys.TOKEN);
  storage.removeItem(keys.TOKEN_EXPIRATION);
  storage.removeItem('USER'); // TODO: Mocked code
  dispatch(requestSignOut());
};

const fetchSignUp = ({
  email,
  firstName,
  lastName,
  login,
  password,
}) => (dispatch) => {
  dispatch(requestSignUp());
  return signUp({
    email,
    firstName,
    lastName,
    login,
    password,
  }).then(() => dispatch(successSignUp()))
    .catch((errors) => dispatch(errorSignUp(errors)))
};

const fetchUser = () => (dispatch) => {
  dispatch(requestUser());
  return getUser()
    .then(user => {
      dispatch(successSignIn({
        ...user,
        authorities: ['ENABLE_SEE_SECRET_PAGE'],
        firstName: user.name
      }));
    })
    .catch((error) => {
      if (error.status === 401) {
        dispatch(errorRequestUser());
        return Promise.reject({ status: 401 });
      }
      dispatch(fetchSignOut());
    });
};

const exportFunctions = {
  fetchRefreshToken,
  fetchSignIn,
  fetchSignOut,
  fetchSignUp,
  fetchUser,
};

export default exportFunctions;
