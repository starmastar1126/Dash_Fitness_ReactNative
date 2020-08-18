import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PanResponder,
  StatusBar,
} from 'react-native';

const {height, width} = Dimensions.get('window');

const MODAL_HEIGHT = height;

export default class Component extends React.Component {
  translateY = new Animated.Value(MODAL_HEIGHT);
  state = {
    visible: false,
    keyboardHeight: 0,
  };
  panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
      gestureState.dy > 10,
    onPanResponderGrant: (e, gestureState) => {},
    onPanResponderMove: Animated.event([null, {dx: 0, dy: this.translateY}], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > MODAL_HEIGHT / 4) {
        this.close();
      } else {
        this.open();
      }
    },
  });

  open = ({call = () => {}} = {}) => {
    this.setState(
      {
        visible: true,
      },
      () => {
        Animated.timing(this.translateY, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start(() => {
          call();
        });
      },
    );
  };
  close = ({call = () => {}} = {}) => {
    Animated.timing(this.translateY, {
      toValue: MODAL_HEIGHT,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        this.setState({visible: false}, () => {
          call();
        });
      }
    });
  };
  render() {
    const {popupHeight} = this.props;
    const {keyboardHeight} = this.state;
    const backgroundColor = this.translateY.interpolate({
      inputRange: [0, MODAL_HEIGHT],
      outputRange: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)'],
      extrapolate: 'clamp',
    });
    const translateY = this.translateY.interpolate({
      inputRange: [0, MODAL_HEIGHT],
      outputRange: [0, MODAL_HEIGHT],
      extrapolate: 'clamp',
    });
    return (
      this.state.visible && (
        <View style={styles.overlay}>
          <Animated.View
            style={[
              {
                transform: [{translateY}],
              },
              styles.modalContainer,
              {
                height: MODAL_HEIGHT,
              },
            ]}>
            <Animated.View
              {...this.panResponder.panHandlers}
              style={{
                height: 90
              }}>
              {this.props.header}
            </Animated.View>
            <View style={{flex: 1}}>
              {this.props.children}
            </View>
          </Animated.View>
          <TouchableWithoutFeedback onPress={this.close}>
            <Animated.View style={[styles.container, {backgroundColor}]} />
          </TouchableWithoutFeedback>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    width,
    height: height - 24,
    zIndex: 1000,
    flex: 1001,
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
    backgroundColor: '#F0F5FA',
    marginHorizontal: 0,
    overflow: 'hidden',
    zIndex: 1001,
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FA',
  },
  closeButton: {
    padding: 20,
  },
});

Component.defaultProps = {
  callbackClose: () => {},
  header: null,
  popupHeight: 500,
};
