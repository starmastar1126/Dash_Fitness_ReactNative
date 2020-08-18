import {combineReducers} from 'redux';

import user from './user';
import challenges from './challenges';
import routes from './routes';
import posts from './posts';

export default combineReducers({
  posts,
  user,
  challenges,
  routes,
});
