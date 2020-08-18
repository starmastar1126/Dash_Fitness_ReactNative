import {Platform} from 'react-native';

import store from 'dash/src/store';
import {actionTypes} from 'dash/src/store/reducers/posts';

import {api} from '../config';

export const getPosts = async () => {
  const response = await api.get('postapi');
  response.data.data.reverse();
  store.dispatch({
    type: actionTypes.SET_POSTS,
    payload: response.data.data,
  });
  return response.data.data;
};

export const deletePostCommit = async (data) => {
  const response = await api.delete('delPostCommit', {data});
  store.dispatch({
    type: actionTypes.EDIT_POST,
    payload: response.data.data,
  });
};

export const addCommit = async (data) => {
  const formData = new FormData();
  formData.append('editPostID', data.editPostID);
  formData.append('commitDetails', data.commitDetails);
  if (data.picture) {
    formData.append('picture', {
      name: `${new Date().getTime()}.jpg`,
      type: 'image/jpeg',
      uri:
        Platform.OS === 'android'
          ? data.picture.uri
          : data.picture.uri.replace('file://', ''),
    });
  }
  console.log( "DATE_",new Date().toUTCString())
  formData.append('commitIds', data.commitIds);
  formData.append('commitTypes', data.commitTypes);
  formData.append('creatorDate', new Date().toUTCString());

  const response = await api.post('addPostCommit', formData);
  store.dispatch({
    type: actionTypes.EDIT_POST,
    payload: response.data.data,
  });
};

export const addPost = async (data) => {
  const user = store.getState().user;
  const formData = new FormData();
  formData.append('creationDate', data.creationDate);
  formData.append('challengeId', data.challengeId);
  formData.append('detail', data.detail);
  formData.append('createdBy', user._id);
  if (data.picture) {
    formData.append('picture', {
      name: `${new Date().getTime()}.jpg`,
      type: 'image/jpeg',
      uri:
        Platform.OS === 'android'
          ? data.picture.uri
          : data.picture.uri.replace('file://', ''),
    });
  }

  const response = await api.post('postapi', formData);
  store.dispatch({
    type: actionTypes.ADD_POST,
    payload: response.data.data,
  });
  return response.data.data;
};
