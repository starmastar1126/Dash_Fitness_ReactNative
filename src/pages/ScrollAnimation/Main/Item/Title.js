import React from 'react';

import {StyleSheet, Animated} from 'react-native';

export default function (props) {
  const {index, ScrollViewAnimation, value, inputRange, scaleItems} = props;
  let fontSize = 30;
  if (index !== 0) {
    fontSize = ScrollViewAnimation.interpolate({
      inputRange: inputRange,
      outputRange: [15, 30, 30],
      extrapolate: 'clamp',
    });
  }
  const marginTop = scaleItems.interpolate({
    inputRange: [0.9, 1],
    outputRange: [30, 120],
    extrapolate: 'clamp',
  });
  return (
    <Animated.Text
      style={[
        styles.title,
        {
          fontSize,
          marginTop,
        },
      ]}>
      {value.title}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
    title: {
        margin: 20,
        marginTop: 120,
        fontSize: 24,
        color: 'white',
        fontFamily: 'Poppins',
        fontWeight: "bold",
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        zIndex: 100
    }
});