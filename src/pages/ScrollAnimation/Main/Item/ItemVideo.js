import React, {useRef, useEffect} from 'react';
import {StyleSheet, Dimensions, Animated, Text} from 'react-native';

import Video from 'react-native-video';

const {height} = Dimensions.get('window');

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {ScrollViewAnimation, index, inputRange} = this.props;
    this.videoRef = React.createRef(null);
    this.scale = 1;
    this.translateX = 0;
    if (index !== 0) {
      this.translateX = ScrollViewAnimation.interpolate({
        inputRange,
        outputRange: [100, 0, 0],
        extrapolate: 'clamp',
      });
      this.scale = ScrollViewAnimation.interpolate({
        inputRange,
        outputRange: [0.95, 1, 1],
        extrapolate: 'clamp',
      });
    }
  }
  componentDidMount = () => {
    if (this.videoRef) {
      this.videoRef.current.setNativeProps({
        paused: false,
      });
      this.videoRef.current.seek(1);
    }
    setTimeout(() => {
      this.videoRef.current.setNativeProps({
        paused: true,
      });
    }, 100);
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.pauseAll) {
      this.videoRef.current.setNativeProps({
        paused: true,
      });
    } else {
      if (this.props.currentPlayIndex === this.props.index) {
        this.videoRef.current.setNativeProps({
          paused: false,
        });
      }
      if (this.props.currentIndex !== this.props.index) {
        this.videoRef.current.setNativeProps({
          paused: true,
        });
        this.videoRef.current.seek(1);
      }
    }
  }
  onEnd = () => {
    const {index, automationScroll} = this.props;
    automationScroll(index);
  };
  checkPlay = (value) => {
    const {snapToOffsets, pauseAll, paddingItem, index} = this.props;
    if (!pauseAll) {
      if (
        value >= snapToOffsets[index] - 5 &&
        value <= snapToOffsets[index] + (height - paddingItem * 2)
      ) {
        // this.videoRef.current.setNativeProps({
        //   paused: false,
        // });
      } else {
        this.videoRef.current.setNativeProps({
          paused: true,
        });
        this.videoRef.current.seek(1);
      }
    }
  };
  render() {
    const {value} = this.props;
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                scale: this.scale,
              },
              {translateX: this.translateX},
            ],
          },
        ]}>
        <Video
          ref={this.videoRef}
          useNativeDriver={false}
          repeat={true}
          source={value.video}
          resizeMode={'cover'}
          style={styles.video}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: -2,
  },
  video: {
    marginLeft: -100,
    aspectRatio: 1,
    height: '100%',
  },
});
