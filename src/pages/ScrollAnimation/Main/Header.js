import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LinearGradient from 'react-native-linear-gradient';

export default function Component({onPressMuted, muted}) {
  const iconSize = 25;
  const onPressClose = () => {
    Actions.pop();
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={onPressClose}>
          <View style={styles.iconContainer}>
            <Icon name="close" color="#96AAC6" size={iconSize} />
          </View>
        </TouchableOpacity>
        <View style={styles.centerContainer}>
          <Text style={styles.time}>12:45</Text>
          <Text style={styles.status}>WARM UP</Text>
        </View>
        <TouchableOpacity onPress={onPressMuted}>
          <View style={styles.iconContainer}>
            <Icon
              name={muted ? 'volume-variant-off' : 'volume-low'}
              color="#96AAC6"
              size={iconSize}
            />
          </View>
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.0001)']}
        style={styles.linearGradient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 10,
    overflow: 'visible',
    zIndex:10
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  linearGradient: {
    position: 'absolute',
    width: '100%',
    height: 2,
    bottom: -2,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#F0F5FA',
  },
  time: {
    fontSize: 30,
    color: '#0099ff',
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },
  status: {
    fontSize: 12,
    color: '#96AAC6',
    letterSpacing: 1.6,
    fontFamily: "Poppins-Bold",
  },
});

Component.defaultProps = {};
