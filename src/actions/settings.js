import AsyncStorage from '@react-native-community/async-storage';

import {api} from '../config';

import {setUser} from './user';

export const getStorage = async () => {
  try {
    let user = null;
    let token = null;
    let values = await AsyncStorage.multiGet(['@user', '@token']);
    values.forEach((val) => {
      switch (val[0]) {
        case '@user':
          if (val[1]) {
            user = JSON.parse(val[1]);
          }
          break;
        case '@token':
          if (val[1]) {
            token = val[1];
          }
          break;
        default:
          break;
      }
    });
    if (token) {
      console.log("TOKEN_USER", token)
      api.defaults.headers.common.Authorization = token;
    }
    if (user) {
      setUser(user);
    }
    return {user, token};
  } catch (e) {
    console.log({e});
  }
};
