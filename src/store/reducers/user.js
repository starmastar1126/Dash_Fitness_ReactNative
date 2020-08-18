export const actionTypes = {
  SET_USER: 'SET_USER',
  DEFAULT: 'DEFAULT',
};

const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'DEFAULT':
      return null;
    default:
      return state;
  }
}
