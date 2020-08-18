import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';

import Item from './Item';
import Header from './Header';
import Audio from './Audio';

const {height} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Lunges',
    time: 15,
    video: require('dash/src/res/video/Jump-Squat.mp4'),
    audioExcercises: require('../Sounds/lunges.mp3'),
    audioSeconds: require('../Sounds/seconds15.mp3'),
    directions: '30” per side',
    info:
      'A treadmill can give you a great walking workout in any weather. If you use the right walking form and vary your workouts with intervals, hills, and speed changes, you can keep yourself interested and challenge your body in new ways. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '2',
    title: 'Pushups',
    time: 20,
    video: require('dash/src/res/video/Wall-Ball.mp4'),
    audioExcercises: require('../Sounds/pushups.mp3'),
    audioSeconds: require('../Sounds/seconds20.mp3'),
    info:
      'A treadmill can give you a great walking workout in any weather. If you use the right walking form and vary your workouts with intervals, hills, and speed changes, you can keep yourself interested and challenge your body in new ways. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '3',
    title: 'Squats',
    time: 15,
    video: require('dash/src/res/video/Jump-Squat.mp4'),
    audioExcercises: require('../Sounds/squats.mp3'),
    audioSeconds: require('../Sounds/seconds15.mp3'),
    directions: '10” per side',
    info:
      'A treadmill can give you a great walking workout in any weather. If you use the right walking form and vary your workouts with intervals, hills, and speed changes, you can keep yourself interested and challenge your body in new ways. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '4',
    title: 'Lunges',
    time: 30,
    video: require('dash/src/res/video/Jump-Squat.mp4'),
    audioExcercises: require('../Sounds/lunges.mp3'),
    audioSeconds: require('../Sounds/seconds30.mp3'),
    directions: '25” per side',
    info:
      'A treadmill can give you a great walking workout in any weather. If you use the right walking form and vary your workouts with intervals, hills, and speed changes, you can keep yourself interested and challenge your body in new ways. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '5',
    title: 'Standing',
    time: 45,
    video: require('dash/src/res/video/Jump-Squat.mp4'),
    audioExcercises: require('../Sounds/standing.mp3'),
    audioSeconds: require('../Sounds/seconds45.mp3'),
    info:
      'A treadmill can give you a great walking workout in any weather. If you use the right walking form and vary your workouts with intervals, hills, and speed changes, you can keep yourself interested and challenge your body in new ways. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

const paddingItem = 100;

export default class extends React.Component {
  constructor(props) {
    super(props);
    const snapToOffsets = [];
    slides.forEach((val, index) => {
      if (index === 0) {
        snapToOffsets.push(0);
      } else {
        snapToOffsets.push(
          (height - paddingItem) * index -
            paddingItem * (index + 1) +
            paddingItem,
        );
      }
    });
    this.ScrollViewAnimation = new Animated.Value(0);
    this.scaleItems = new Animated.Value(1);
    this.ScrollRef = React.createRef(null);
    this.AudioRef = React.createRef(null);
    this.state = {
      pauseAll: false,
      muted: false,
      currentIndex: 0,
      currentPlayIndex: -1,
      snapToOffsets,
    };
  }

  componentDidMount() {
    if (this.AudioRef) {
      this.startPlayItem(0);
    }
  }
  onPressInfo = () => {
    if (!this.state.pauseAll) {
      this.onPress();
    }
    this.props.openInfoPopup(slides[this.state.currentIndex]);
  };
  onPressReplaceExcercise = () => {
    if (!this.state.pauseAll) {
      this.onPress();
    }
    this.props.openReplaceExcercise(slides[this.state.currentIndex]);
  };
  onPress = () => {
    if (this.state.pauseAll) {
      this.setState(
        {
          pauseAll: false,
        },
        () => {
          Animated.spring(this.scaleItems, {
            toValue: 1,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: false,
          }).start(({finished}) => {
            if (finished) {
              this.AudioRef.current.continue(
                slides[this.state.currentIndex],
                () => {
                  // if we have new Item
                  this.startPlayItem(this.state.currentIndex);
                },
                () => {
                  this.setState({
                    currentPlayIndex: this.state.currentIndex,
                  });
                },
              );
            }
          });
        },
      );
    } else {
      this.setState(
        {
          pauseAll: true,
        },
        () => {
          Animated.spring(this.scaleItems, {
            toValue: 0.9,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: false,
          }).start(({finished}) => {
            if (finished) {
              this.AudioRef.current.pause();
            }
          });
        },
      );
    }
  };
  onPressMuted = () => {
    this.setState(
      {
        muted: !this.state.muted,
      },
      () => {
        if (this.state.muted) {
          this.AudioRef.current.mute();
        } else {
          this.AudioRef.current.unmute();
        }
      },
    );
  };
  startPlayItem = (index) => {
    // Play audio item
    this.AudioRef.current.setAudio(slides[index], () => {
      this.AudioRef.current.play(() => {
        // Play current item
        this.setState({
          currentPlayIndex: index,
        });
      });
    });
  };
  onMomentumScrollEnd = (e) => {
    const index = this.state.snapToOffsets
      .map((v) => Math.ceil(v))
      .indexOf(Math.ceil(e.nativeEvent.contentOffset.y));
    // Get current item index
    if (index !== -1 && this.state.currentIndex !== index) {
      // Set current item and disable play current item
      this.setState(
        {
          currentIndex: index,
          currentPlayIndex: null,
        },
        () => {
          if (!this.state.pauseAll) {
            this.startPlayItem(index);
          }
        },
      );
    }
  };
  automationScroll = (index) => {
    const {snapToOffsets} = this.state;
    if (snapToOffsets[index + 1]) {
      // Set current item and disable play current item
      this.setState(
        {
          currentIndex: index + 1,
          currentPlayIndex: null,
        },
        () => {
          // Scroll to item
          this.ScrollRef.current.scrollTo({
            x: 0,
            y: snapToOffsets[index + 1],
            animated: true,
          });
          this.startPlayItem(index + 1);
        },
      );
    }
  };

  render() {
    const {
      muted,
      pauseAll,
      currentIndex,
      snapToOffsets,
      currentPlayIndex,
    } = this.state;

    const {
      ScrollViewAnimation,
      scaleItems,
      ScrollRef,
      AudioRef,
      automationScroll,
    } = this;
    return (
      <View style={styles.container}>
        <Audio ref={AudioRef} muted={this.state.muted} />
        <Header onPressMuted={this.onPressMuted} muted={muted} />
        <ScrollView
          ref={ScrollRef}
          contentContainerStyle={{
            height: pauseAll
              ? snapToOffsets[snapToOffsets.length - 1] +
                height +
                paddingItem * 2
              : snapToOffsets[snapToOffsets.length - 1] + height,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {y: ScrollViewAnimation}},
              },
            ],
            {
              useNativeDriver: false,
            },
          )}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          decelerationRate={'fast'}
          snapToInterval={height - paddingItem}
          snapToOffsets={snapToOffsets}
          scrollEventThrottle={16}
          snapToAlignment={'start'}>
          {slides.map((value, index) => (
            <Item
              key={value.id}
              scaleItems={scaleItems}
              paddingItem={paddingItem}
              value={value}
              index={index}
              ScrollRef={ScrollRef}
              snapToOffsets={snapToOffsets}
              ScrollViewAnimation={ScrollViewAnimation}
              pauseAll={pauseAll}
              onPress={this.onPress}
              muted={muted}
              currentIndex={currentIndex}
              automationScroll={automationScroll}
              currentPlayIndex={currentPlayIndex}
              onPressInfo={this.onPressInfo}
              onPressReplaceExcercise={this.onPressReplaceExcercise}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
