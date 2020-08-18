import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const {height} = Dimensions.get('window');

export default function Component(props) {
  const {paddingItem, side} = props;
  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.001)']}
      style={[
        {
          height: (height - paddingItem) / 5,
        },
        side === 'top' ? styles.topShadow : styles.bottomShadow,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  topShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  bottomShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
});

Component.defaultProps = {};
