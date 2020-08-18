export const actionTypes = {
  SET_CHALLENGES: 'SET_CHALLENGES',
  ADD_CHALLENGE: 'ADD_CHALLENGE',
  GET_CHALLENGES: 'GET_CHALLENGES',
  DEFAULT: 'DEFAULT',
};

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_CHALLENGE':
      state.unshift(action.payload);
      // return [...state, action.payload]
      return [...state];
    case 'SET_CHALLENGES':
      return action.payload;
    case 'GET_CHALLENGES':
      return action.payload
    case 'DEFAULT':
      return [];
    default:
      return state;
  }
}
