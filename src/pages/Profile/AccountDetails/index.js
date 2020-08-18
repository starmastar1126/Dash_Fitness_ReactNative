import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
  Text,
  PanResponder,
  ScrollView,
  Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import _ from 'lodash';
import NavBar from 'dash/src/components/NavBar';
import * as UserActions from 'dash/src/actions/user';

import Layout from './Layout';

const {height, width} = Dimensions.get('screen');

const defaultState = {
  visible: false,
  changed: false,
  user: {},
  loading: false,
};

export default class Component extends React.Component {
  translateY = new Animated.Value(height - 100);
  ScrollViewAnimation = new Animated.Value(0);
  state = _.cloneDeep(defaultState);
  panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
      gestureState.dy > 5,
    onPanResponderGrant: (e, gestureState) => {},
    onPanResponderMove: Animated.event([null, {dx: 0, dy: this.translateY}], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > (height - 100) / 4) {
        Animated.timing(this.translateY, {
          toValue: height - 100,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(this.translateY, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      }
    },
  });
  
  open = () => {
    this.setState(
      {
        visible: true,
        user: _.cloneDeep(this.props.user),
        loading: false,
      },
      () => {
        Animated.timing(this.translateY, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      },
    );
  };
  close = () => {
    this.props.callbackClose();
    Animated.timing(this.translateY, {
      toValue: height - 100,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        this.setState({..._.cloneDeep(defaultState)});
      }
    });
  };
  onChangeText = (value, text) => {
    const data = {
      ...this.state.user,
      [value.field]: text,
    };
    this.setState({user: data});
  };
  saveChanges = async () => {
    try {
      this.setState({loading: true});
      await UserActions.editUser(this.state.user);
      this.setState({loading: false}, () => {
        this.close();
      });
    } catch (e) {
      this.setState({loading: false});
    }
  };
  render() {
    const {user} = this.props;
    const backgroundColor = this.translateY.interpolate({
      inputRange: [0, height - 100],
      outputRange: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)'],
      extrapolate: 'clamp',
    });
    const translateY = this.translateY.interpolate({
      inputRange: [0, height - 100],
      outputRange: [0, height - 100],
      extrapolate: 'clamp',
    });
    const opacityLinear = this.ScrollViewAnimation.interpolate({
      inputRange: [0, 3],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      this.state.visible && (
        <KeyboardAvoidingView style={styles.overlay} behavior="padding">
          <TouchableWithoutFeedback onPress={this.close}>
            <Animated.View style={[styles.container, {backgroundColor}]} />
          </TouchableWithoutFeedback>
          <Animated.View
            style={[
              {
                transform: [{translateY}],
              },
              styles.modalContainer,
            ]}>
            <ScrollView
              extraScrollHeight={120}
              enableOnAndroid={true}
              contentContainerStyle={{paddingBottom: 20}}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {contentOffset: {y: this.ScrollViewAnimation}},
                  },
                ],
                {
                  useNativeDriver: false,
                },
              )}>
              <Layout user={this.state.user} onChangeText={this.onChangeText} />
            </ScrollView>
            <Animated.View
              style={styles.header}
              {...this.panResponder.panHandlers}>
              <NavBar
                title="Account Details"
                icon={
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={this.close}>
                    <Icon name={'close'} color="#B6BCCA" size={20} />
                  </TouchableOpacity>
                }
                iconRight={
                  <View style={{width: 40}}>
                    {!_.isEqual(this.props.user, this.state.user) ? (
                      this.state.loading ? (
                        <ActivityIndicator size="small" color="#1AA0FF" />
                      ) : (
                        <TouchableOpacity onPress={this.saveChanges}>
                          <Text style={styles.save}>Save</Text>
                        </TouchableOpacity>
                      )
                    ) : null}
                  </View>
                }
              />

              <Animated.View
                style={[
                  styles.linearGradientContainer,
                  {opacity: opacityLinear},
                ]}>
                <LinearGradient
                  colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.0001)']}
                  style={styles.linearGradient}
                />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </KeyboardAvoidingView>
      )
    );
  }
}

const styles = StyleSheet.create({
  save: {
    color: '#1AA0FF',
    fontFamily: 'Poppins-Bold',
  },
  linearGradientContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    bottom: -2,
  },
  linearGradient: {
    width: '100%',
    height: 2,
  },
  overlay: {
    width,
    height,
    position: 'absolute',
    zIndex: 1000,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  container: {
    width,
    height,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    flex: 1,
    zIndex: 1000,
  },
  modalContainer: {
    marginTop: 100,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    marginHorizontal: 0,
    flex: 1,
    height: height - 100,
    overflow: 'hidden',
    zIndex: 1001,
  },
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    height: 80
  },
  closeButton: {
    width: 40,
  },
});

Component.defaultProps = {
  callbackClose: () => {},
};
