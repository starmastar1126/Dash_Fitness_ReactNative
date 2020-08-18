import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import Layout from './Layout';
import AccountDetails from './AccountDetails';

const {height, width} = Dimensions.get('screen');

export default class Component extends React.Component {
  AccountDetailsRef;
  translateY = new Animated.Value(1);
  scale = new Animated.Value(0);
  ScrollViewAnimation = new Animated.Value(0);
  state = {
    visible: false,
  };
  open = () => {
    this.setState(
      {
        visible: true,
      },
      () => {
        Animated.timing(this.translateY, {
          toValue: 0,
          duration: 250,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      },
    );
  };
  close = () => {
    Animated.timing(this.translateY, {
      toValue: 1,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        this.setState({visible: false}, () => {
          this.props.callbackClose();
        });
      }
    });
  };
  accountDetailsClose = () => {
    Animated.timing(this.scale, {
      toValue: 0,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }
  openAccountDetails = () => {
    this.AccountDetailsRef.open();
    Animated.timing(this.scale, {
      toValue: 1,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };
  render() {
    const backgroundColor = this.translateY.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)'],
      extrapolate: 'clamp',
    });
    const translateY = this.translateY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, height - 100],
      extrapolate: 'clamp',
    });
    const opacityLinear = this.ScrollViewAnimation.interpolate({
      inputRange: [0, 3],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const scale = this.scale.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.9],
      extrapolate: 'clamp',
    });
    return (
      <>
        {this.state.visible && (
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={this.close}>
              <Animated.View style={[styles.container, {backgroundColor}]} />
            </TouchableWithoutFeedback>
            <Animated.View
              style={[
                {
                  transform: [{translateY}, {scale}],
                },
                styles.modalContainer,
              ]}>
              <View style={styles.header}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={this.close}>
                  <Icon name={'close'} color="#B6BCCA" size={20} />
                </TouchableOpacity>
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
              </View>
              <ScrollView
                onScroll={Animated.event(
                  [
                    {
                      nativeEvent: {
                        contentOffset: {y: this.ScrollViewAnimation},
                      },
                    },
                  ],
                  {
                    useNativeDriver: false,
                  },
                )}>
                <Layout openAccountDetails={this.openAccountDetails} closePopup={this.close} />
              </ScrollView>
            </Animated.View>
          </View>
        )}
        <AccountDetails ref={(e) => (this.AccountDetailsRef = e)} callbackClose={this.accountDetailsClose} />
      </>
    );
  }
}

const styles = StyleSheet.create({
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
      height: 2
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
    height: height - 100,
    overflow: 'hidden',
    zIndex: 1001,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    padding: 20,
  },
});

Component.defaultProps = {
  callbackClose: () => {},
};
