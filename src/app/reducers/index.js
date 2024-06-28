import { combineReducers } from 'redux';

import user from './user';
import executionFacts from './executionFacts';

export default combineReducers({
  user, executionFacts
});
