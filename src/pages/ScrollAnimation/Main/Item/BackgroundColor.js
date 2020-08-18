import React from 'react';

import {StyleSheet, Animated} from 'react-native';

export default function (props) {
  const {index, ScrollViewAnimation, inputRange} = props;
  let backgroundColor;
  if (index !== 0) {
    backgroundColor = ScrollViewAnimation.interpolate({
      inputRange,
      outputRange: [
        'rgba(111,128,167, 0.5)',
        'rgba(96,181,254, 0)',
        'rgba(72,255,0,0.5)',
      ],
      extrapolate: 'clamp',
    });
  } else {
    backgroundColor = ScrollViewAnimation.interpolate({
      inputRange,
      outputRange: ['rgba(72,255,0,0)', 'rgba(72,255,0,0.5)'],
      extrapolate: 'clamp',
    });
  }
  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          backgroundColor,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
