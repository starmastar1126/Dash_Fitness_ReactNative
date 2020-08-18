import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { actionTypes } from 'dash/src/store/reducers/challenges';
import store from 'dash/src/store';
import { api, host } from '../config';

export const getMyChallenges = async () => {
  const response = await api.post('challengesapiPager', {
    pageLength: 20,
    pageNumber: 1,
  });
  response.data.data.reverse();
  store.dispatch({
    type: actionTypes.SET_CHALLENGES,
    payload: response.data.data,
  });
  return response.data.data;
};

export const getAllChallengesOfDB = ()=>{

  return axios({
    method: 'get',
    url: host+"/challengesapi",
  })
    .then(response => {
      store.dispatch({
        type: actionTypes.GET_CHALLENGES,
        payload: response.data.data,
      });
      return response.data.data.reverse();
    }).catch(err => {
      console.log(" error is ", err);
    })
}

export const postMyChallenge = async (data) => {

  console.log("postMyChallenge-----> ", data);

  const user = store.getState().user;  
  const picture = data.graphic;
  const formData = new FormData();
  
  formData.append('createdBy', user._id);
  formData.append('title', data.title);
  formData.append('accessType', data.public ? 'public' : 'private');
  formData.append('description', data.description);
  formData.append('startDate', data.startDate);
  formData.append('allStep', 30);
  formData.append('scheduleDate', '30 days');
  formData.append('typeDescription', data.type.description);
  formData.append('Version', data.version);
  formData.append('imageFlag', false);
  formData.append('Plan',data.type.title);
  formData.append('ActiveDate',data.startDate);
  formData.append('PlanID',data.type._id);
  //formData.append('Featured',"No");
  //formData.append('program', data.typeProgram.number);

  //formData.append('',);
    
    formData.append('challengeBGImage', {
      name: `${new Date().getTime()}.jpg`,
      type: 'image/jpeg',
      uri:
        Platform.OS === 'android'
          ? String(picture.uri)
          : picture.uri.replace('file://', ''),
    });
    formData.append('TypeImage', {
      name: `${new Date().getTime()}.jpg`,
      type: 'image/jpeg',
      uri:
        Platform.OS === 'android'
          ? picture.uri
          : picture.uri.replace('file://', ''),
    });
  
  console.log(" form data ==================================", formData);
  
  return axios({
    method: 'post',
    url: host+"/challengesapi",
    data: formData
    //headers: headers,
  })
    .then(response => {
      console.log("126 Response --- =======-----", response);
      store.dispatch({
        type: actionTypes.ADD_CHALLENGE,
        payload: response.data.data,
      });
      return response.data.data;
    }).catch(err => {
      console.log(" error is ", err);
    })
};
