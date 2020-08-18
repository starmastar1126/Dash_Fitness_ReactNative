import React from 'react';
import {
  Platform,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';

export default class extends React.Component {
  scaleAnim = new Animated.Value(1);
  setPress(press) {
    const {scale} = this.props;
    if (press) {
      Animated.spring(this.scaleAnim, {
        toValue: scale || 0.8,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: Platform.OS === 'android',
      }).start();
    } else {
      Animated.spring(this.scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: Platform.OS === 'android',
      }).start();
    }
  }
  render() {
    const {children, style, ...props} = this.props;
    return (
      <TouchableWithoutFeedback
        onPressIn={() => this.setPress(true)}
        onPressOut={() => this.setPress(false)}
        {...props}>
        <Animated.View style={[style, {transform: [{scale: this.scaleAnim}]}]}>
          {children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
