const config = {
  // Services
  USERS_SERVICE: 'http://localhost:1000',
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
  EXECUTION_FACTS_SERVICE: 'http://localhost:1000',
  GOOGLE_OAUTH_LINK: 'http://localhost:1000/oauth/authenticate',
};

export default config;
