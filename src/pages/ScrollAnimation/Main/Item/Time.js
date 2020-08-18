import React, {useState, useEffect} from 'react';
import {Animated, StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: this.props.value.time,
    };
    this.timerInterval;
  }

  componentDidUpdate(prevProps) {
    if (this.props.pauseAll) {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
      return;
    }
    if (
      (prevProps.pauseAll &&
        !this.props.pauseAll &&
        this.props.currentPlayIndex === this.props.index) ||
      (prevProps.currentPlayIndex !== this.props.currentPlayIndex &&
        this.props.currentPlayIndex === this.props.index)
    ) {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
      this.setState(
        {
          timer: this.state.timer,
        },
        () => {
          this.timerInterval = setInterval(() => {
            if (this.state.timer === 0) {
              this.props.automationScroll(this.props.index);
            } else {
              this.setState({
                timer: this.state.timer - 1,
              });
            }
          }, 1000);
        },
      );
    } else {
      if (
        this.props.currentPlayIndex !== prevProps.currentPlayIndex &&
        prevProps.currentPlayIndex === this.props.index
      ) {
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
        }
        this.setState({
          timer: this.props.value.time,
        });
      }
    }
  }

  render() {
    const {
      value,
      index,
      inputRange,
      paddingItem,
      ScrollViewAnimation,
    } = this.props;
    let timeAnim, fontSize, fontSizeDirections;

    const bottomPaddingTime = value.directions ? 120 : 100;
    const bottomPaddingContainer = height - paddingItem - bottomPaddingTime;
    if (index !== 0) {
      timeAnim = ScrollViewAnimation.interpolate({
        inputRange: inputRange,
        outputRange: [120, bottomPaddingContainer, bottomPaddingContainer],
        extrapolate: 'clamp',
      });
      fontSize = ScrollViewAnimation.interpolate({
        inputRange: inputRange,
        outputRange: [24, 30, 30],
        extrapolate: 'clamp',
      });
      fontSizeDirections = ScrollViewAnimation.interpolate({
        inputRange: inputRange,
        outputRange: [16, 20, 20],
        extrapolate: 'clamp',
      });
    } else {
      fontSize = 30;
      fontSizeDirections = 20;
      timeAnim = bottomPaddingContainer;
    }
    const minutes = Math.floor(this.state.timer / 60);
    const seconds = this.state.timer - minutes * 60;
    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: timeAnim,
        }}>
        <Animated.Text
          style={[
            styles.time,
            {
              fontSize,
            },
          ]}>
          {`${minutes < 10 ? '0' : ''}${minutes}:${
            seconds < 10 ? '0' : ''
          }${seconds}`}
        </Animated.Text>
        {value.directions && (
          <Animated.Text
            style={[
              styles.directions,
              {
                fontSize: fontSizeDirections,
              },
            ]}>
            {value.directions}
          </Animated.Text>
        )}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  time: {
    margin: 20,
    marginBottom: 0,
    fontSize: 30,
    color: 'white',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    zIndex: 100,
  },
  directions: {
    margin: 20,
    marginTop: 0,
    fontSize: 26,
    color: 'white',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    zIndex: 100,
  },
});
