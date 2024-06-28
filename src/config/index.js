const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const config = {
  // Services
  USERS_SERVICE: BACKEND_URL,
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
  EXECUTION_FACTS_SERVICE: BACKEND_URL,
  GOOGLE_OAUTH_LINK: `${BACKEND_URL}/oauth/authenticate`,
};

export default config;
