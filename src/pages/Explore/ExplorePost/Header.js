import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {BackArrow} from '../../../components/Icons';

const {width, height} = Dimensions.get('window');

export default function Component(props) {
  const {ScrollViewAnimation} = props;
  const scale = ScrollViewAnimation.interpolate({
    inputRange: [0, height / 2 - 20],
    outputRange: [1, 1.1],
    extrapolate: 'clamp',
  });
  const zIndex = ScrollViewAnimation.interpolate({
    inputRange: [height / 2 - 125, height / 2 - 80],
    outputRange: [10, -1],
    extrapolate: 'clamp',
  });
  return (
    <>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.pictureContainer,
            {
              transform: [{scale}],
            },
          ]}>
          <Image
            style={styles.picture}
            resizeMode="cover"
            source={require('dash/src/res/explore/ExplorePost.png')}
          />
        </Animated.View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          Actions.pop();
        }}>
        <Animated.View style={[styles.backButtonContainer, {zIndex}]}>
          <BackArrow fill="#fff" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  pictureContainer: {
    width,
    height: height / 2,
  },
  picture: {
    width,
    height: height / 2,
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: height / 2,
    zIndex: -1,
  },
  backButtonContainer: {
    position: 'absolute',
    left: 15,
    top: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(41,46,58, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Component.defaultProps = {};
