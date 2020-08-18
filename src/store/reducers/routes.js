import {ActionConst} from 'react-native-router-flux';

const initState = {
  routeName: 'HomePage',
};

export default function reducer(state = initState, action = {}) {
  switch (action.type) {
    case ActionConst.FOCUS:
      return {
        ...state,
        routeName: action.routeName,
        params: action.params,
      };
    case ActionConst.BLUR:
      return {
        ...state,
        routeName: action.routeName,
        params: action.params,
      };
    default:
      return state;
  }
}
