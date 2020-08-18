import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
} from '@invertase/react-native-apple-authentication';

import {Actions} from 'react-native-router-flux';

import {Google, Apple} from 'dash/src/components/Icons';

import * as userActions from 'dash/src/actions/user';

if (Platform.OS === 'android') {
  GoogleSignin.configure({
    webClientId:
       //'942215840003-l4kldjpp92k91f1q07srekvunfpff3qt.apps.googleusercontent.com', // Debug
      '799774940481-vfnnqtmfelum6v08o96r6vdm719qf906.apps.googleusercontent.com', // Live 
    offlineAccess: false,
  });
}

export default class Component extends React.Component {
  createAccount = async ({userInfo}) => {
    const {callbackButton} = this.props;
    const res = await userActions.loginGoogleUser({
      id_token: userInfo.idToken,
      username: '',
    });
    if (callbackButton) {
      callbackButton({userInfo});
    }
    if (res.username === '') {
      Actions.PickAUsername({
        userInfo,
        callback: () => {
          Actions.pop();
        },
      });
    }
  };
  createAccountApple = async (data) => {
    const {callbackButton} = this.props;
    const res = await userActions.loginAppleUser({
      id_token: data.identityToken,
      username: data.fullName.givenName,
      email: data.email,
      photo: '',
      kid: data.user,
    });
    if (callbackButton) {
      callbackButton({userInfo: data});
    }
  };
  onPressGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log({userInfo})
      this.createAccount({userInfo});
    } catch (e) {
      console.log(e.message);
    }
  };
  onAppleButtonPress = async () => {
    try {
      const {callbackButton} = this.props;
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });
      this.createAccountApple(appleAuthRequestResponse);
      if (callbackButton) {
        callbackButton();
      }
    } catch (e) {}
  };
  render() {
    return Platform.OS === 'ios' ? (
      <TouchableOpacity
        style={styles.appleButtonContainer}
        onPress={this.onAppleButtonPress}>
        <Apple />
        <Text style={styles.signInAppleText}>Sign In With Apple</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={styles.googleButtonContainer}
        onPress={this.onPressGoogle}>
        <View style={styles.googlePicture}>
          <Google />
        </View>
        <Text style={styles.signInGoogleText}>Sign In With Google</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  googlePicture: {
    position: 'absolute',
    left: 10,
  },
  signInGoogleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'white',
    lineHeight: 20,
    marginLeft: 20,
  },
  googleButtonContainer: {
    backgroundColor: '#4286F5',
    paddingVertical: 25,
    paddingHorizontal: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 60,
    marginTop: 15,
  },
  signInAppleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'white',
    marginLeft: 15,
    lineHeight: 20,
    marginTop: 5,
  },
  appleButtonContainer: {
    backgroundColor: 'black',
    paddingVertical: 25,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 60,
    marginTop: 15,
  },
});

Component.defaultProps = {};
