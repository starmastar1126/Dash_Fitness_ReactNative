export const actionTypes = {
  SET_POSTS: 'SET_POSTS',
  ADD_POST: 'ADD_POST',
  EDIT_POST: 'EDIT_POST',
  DEFAULT: 'DEFAULT',
};

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case 'EDIT_POST':
      const post = action.payload;
      const index = state.map((v) => v._id).indexOf(post._id);
      if (index !== -1) {
        state[index] = post;
      }
      return [...state];
    case 'ADD_POST':
      state.unshift(action.payload);
      return [...state];
    case 'SET_POSTS':
      return action.payload;
    case 'DEFAULT':
      return [];
    default:
      return state;
  }
}
