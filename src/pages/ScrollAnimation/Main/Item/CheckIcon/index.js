import React from 'react';

import {Animated, StyleSheet, Dimensions} from 'react-native';

import Icon from './Icon';

const {height} = Dimensions.get('window');

export default function (props) {
  const {index, ScrollViewAnimation, inputRange} = props;
  let scale, opacity;
  if (index !== 0) {
    scale = ScrollViewAnimation.interpolate({
      inputRange: inputRange,
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    opacity = ScrollViewAnimation.interpolate({
      inputRange: inputRange,
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
  } else {
    scale = ScrollViewAnimation.interpolate({
      inputRange: inputRange,
      outputRange: [0, 1.2],
      extrapolate: 'clamp',
    });
    opacity = ScrollViewAnimation.interpolate({
      inputRange: inputRange,
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
  }
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{scale}],
          opacity,
        },
      ]}>
      <Icon height="40" width="40" fill="rgba(255,255,255,1)" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    zIndex: 11,
  },
});
