import React from 'react';
import {View, Dimensions, Text, TouchableOpacity, Animated} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {Add} from 'dash/src/components/Icons';
import {CreateNewChallengeRef} from 'dash/src/pages/CustomTabBar';

export default class Component extends React.Component {
  state = {
    currentIndex: 0
  }
  onChangeCurrentIndex = (currentIndex) => {
    this.setState({currentIndex})
  }
  render() {
    const {
      ScrollViewAnimation,
      left,
      right,
      onChangeTab,
    } = this.props;
    const {currentIndex} = this.state;
    const translateY = ScrollViewAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: [0, -280],
      extrapolate: 'clamp',
    });
    const opacity = ScrollViewAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <>
        <Animated.View
          style={[
            {
              transform: [{translateY}],
              opacity,
            },
            styles.container,
          ]}>
          <View style={styles.header}>
            <Text style={styles.title}>My Challenges</Text>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => {
                CreateNewChallengeRef.openCreateNew();
              }}>
              <Add stroke="#1AA0FF" height="10" width="10" />
            </TouchableOpacity>
          </View>
          <View style={styles.containerTab}>
            <Animated.View
              style={[
                styles.selectedContainer,
                {
                  right,
                  left,
                },
              ]}
            />
            <TouchableOpacity style={[styles.itemTab]} onPress={() => onChangeTab(0)}>
              <Text
                style={[
                  styles.tabTextTab,
                  currentIndex === 0
                    ? {color: EStyleSheet.value('$lightBlue')}
                    : {},
                ]}>
                Current
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.itemTab]} onPress={() => onChangeTab(1)}>
              <Text
                style={[
                  styles.tabTextTab,
                  currentIndex === 1
                    ? {color: EStyleSheet.value('$lightBlue')}
                    : {},
                ]}>
                Previous
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </>
    );
  }
}

const styles = EStyleSheet.create({
  selectedContainer: {
    position: 'absolute',
    top: 2,
    bottom: 2,
    marginHorizontal: 2,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  tabTextTab: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    lineHeight: 20,
    color: 'white',
  },
  itemTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: 10,
    overflow: 'hidden',
  },
  containerTab: {
    flexDirection: 'row',
    backgroundColor: 'rgba(33, 41, 61, 0.05)',
    borderRadius: 10,
    padding: 2,
    marginHorizontal: 15,
    overflow: 'hidden',
    marginBottom: 25,
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  linearGradientContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    bottom: -2,
  },
  linearGradient: {
    width: '100%',
    height: 2,
  },
  avatar: {
    width: 55,
    height: 55,
  },
  avatarContainer: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
  },
  notifNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
    color: 'white',
  },
  notif: {
    position: 'absolute',
    top: -5,
    right: -2,
    backgroundColor: '#FF2272',
    height: 15,
    width: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  bell: {
    width: 25,
    height: 25,
    overflow: 'visible',
  },
  checkItem: {
    paddingVertical: 15,
  },
  checker: {
    position: 'absolute',
    top: 5,
    bottom: 5,
    width: 60,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    zIndex: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  topPart: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'space-between',
    width: 120,
    borderRadius: 50,
  },
  bottomPart: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'space-between',
    width: 130,
    borderRadius: 50,
  },
  centeredContainer: {},
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 220,
    justifyContent: 'center',
  },
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingLeft: 15,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    zIndex: 10,
    // backgroundColor: '#00A1FF',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginLeft: 15,
  },
});

Component.defaultProps = {};
