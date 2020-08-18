import React from 'react';

import {
  Animated,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Title from './Title';
import Time from './Time';
import BackgroundColor from './BackgroundColor';
import CheckIcon from './CheckIcon';
import ItemVideo from './ItemVideo';
import PausePlay from './PausePlay';

const {height} = Dimensions.get('window');

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {index, snapToOffsets, paddingItem} = this.props;
    if (index !== 0) {
      this.inputRange = [
        snapToOffsets[index - 1],
        snapToOffsets[index],
        snapToOffsets[index + 1] || snapToOffsets[index] + height - paddingItem,
      ];
    } else {
      this.inputRange = [0, height];
    }
    this.opacity = new Animated.Value(0);
  }

  pressTimeout;
  componentDidUpdate() {
    const {currentIndex, index, pauseAll} = this.props;
    if(currentIndex !== index && !pauseAll) {
      this.opacity.setValue(0)
    }
  }
  onPress = () => {
    // if on pause
    if (this.props.pauseAll) {
      Animated.spring(this.opacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
      this.props.onPress();
      return;
    }

    if (this.opacity._value > 0.3) {
      // second click
      this.props.onPress();
    } else {
      // first click
      if(this.pressTimeout) {
        clearTimeout(this.pressTimeout)
      }
      Animated.spring(this.opacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(({finished}) => {
        if(finished) {
          this.pressTimeout = setTimeout(() => {
            Animated.spring(this.opacity, {
              toValue: 0,
              duration: 500,
              easing: Easing.ease,
              useNativeDriver: false,
            }).start();
          }, 500)
        }
      });
    }
  };
  render() {
    const {
      value,
      index,
      ScrollViewAnimation,
      paddingItem,
      ScrollRef,
      snapToOffsets,
      scaleItems,
      onPressInfo,
      pauseAll,
      currentIndex,
      automationScroll,
      currentPlayIndex,
      onPressReplaceExcercise
    } = this.props;

    const elementProps = {
      value,
      index,
      ScrollViewAnimation,
      inputRange: this.inputRange,
      paddingItem,
      ScrollRef,
      snapToOffsets,
      scaleItems,
      pauseAll,
      currentIndex,
      automationScroll,
      currentPlayIndex,
    };
    const marginTop = scaleItems.interpolate({
      inputRange: [0.9, 1],
      outputRange: [index === 0 ? -50 : 50, index === 0 ? -100 : -1],
      extrapolate: 'clamp',
    });
    let marginBottom;
    if (index === 0) {
      marginBottom = scaleItems.interpolate({
        inputRange: this.inputRange,
        outputRange: [-100, 0],
        extrapolate: 'clamp',
      });
    } else {
      marginBottom = scaleItems.interpolate({
        inputRange: this.inputRange,
        outputRange: [-100, 0, 0],
        extrapolate: 'clamp',
      });
    }
    let opacity = pauseAll ? 1 : 0;
    if (!pauseAll) {
      opacity = this.opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      });
    } else {
      this.opacity.setValue(1)
    }
    return (
      <Animated.View
        style={[
          styles.containerItem,
          {
            marginBottom,
            marginTop,
            transform: [{scale: scaleItems}],
            zIndex: -index,
          },
        ]}>
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View style={{flex: 1}}>
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.001)']}
              style={[
                {
                  height: (height - paddingItem) / 5,
                },
                styles.topShadow,
              ]}
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.001)', 'rgba(0,0,0,0.3)']}
              style={[
                {
                  height: (height - paddingItem) / 5,
                },
                styles.bottomShadow,
              ]}
            />
            <Title {...elementProps} />
            <ItemVideo {...elementProps} />
            <Time {...elementProps} />
            <BackgroundColor {...elementProps} />
            <CheckIcon {...elementProps} />
            <Animated.View style={[styles.playContainer, {opacity}]}>
              <PausePlay name={pauseAll ? 'play' : 'pause'} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.navigation, {opacity}]}>
          <TouchableOpacity style={styles.navigationItem} onPress={onPressReplaceExcercise}>
            <Image source={require('dash/src/res/arrows.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigationItem} onPress={onPressInfo}>
            <Image source={require('dash/src/res/dots.png')} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  containerItem: {
    marginTop: -1,
    borderRadius: 25,
    width: '100%',
    height: height - 100,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: -100,
  },
  playContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
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
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 25,
    right: 10,
    zIndex: 150,
  },
  navigationItem: {
    padding: 15,
  },
});
