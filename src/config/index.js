const BACKEND_URL = 'http://localhost:8080';

const config = {
  // Services
  USERS_SERVICE: BACKEND_URL,
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
  EXECUTION_FACTS_SERVICE: BACKEND_URL,
  GOOGLE_OAUTH_LINK: `${BACKEND_URL}/oauth/authenticate`,
};

export default config;
