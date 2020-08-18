import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PanResponder,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {ChevronRight} from 'dash/src/components/Icons';
import NavBar from 'dash/src/components/NavBar';

const array = [
  {
    title: 'Hide Post',
    subTitle: 'Remove this post from your community feed.',
  },
  {
    title: 'Report Post',
    subTitle: 'I’m concerned about this post.',
  },
  {
    title: 'Block User',
    subTitle: 'Stop seeing posts/challenges from this person.',
  },
];

const {height, width} = Dimensions.get('screen');
const popoupHeight = 400;

export default class Component extends React.Component {
  translateY = new Animated.Value(popoupHeight);
  state = {
    visible: false,
  };
  panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
      gestureState.dy > 10,
    onPanResponderGrant: (e, gestureState) => {},
    onPanResponderMove: Animated.event([null, {dx: 0, dy: this.translateY}], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > popoupHeight / 4) {
        Animated.timing(this.translateY, {
          toValue: popoupHeight,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start(() => {});
      } else {
        Animated.timing(this.translateY, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start(() => {});
      }
    },
  });

  open = () => {
    this.setState(
      {
        visible: true,
      },
      () => {
        Animated.timing(this.translateY, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start(() => {});
      },
    );
  };
  close = () => {
    Animated.timing(this.translateY, {
      toValue: popoupHeight,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        this.setState({visible: false});
      }
    });
  };
  render() {
    const backgroundColor = this.translateY.interpolate({
      inputRange: [0, popoupHeight],
      outputRange: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)'],
      extrapolate: 'clamp',
    });
    const translateY = this.translateY.interpolate({
      inputRange: [0, popoupHeight],
      outputRange: [0, popoupHeight],
      extrapolate: 'clamp',
    });
    return (
      this.state.visible && (
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={this.close}>
            <Animated.View style={[styles.container, {backgroundColor}]} />
          </TouchableWithoutFeedback>
          <Animated.View
            style={[
              {
                transform: [{translateY}],
              },
              styles.modalContainer,
              {
                height: popoupHeight,
              },
            ]}>
            <Animated.View {...this.panResponder.panHandlers} style={{zIndex: 100}}>
              <NavBar
                title=""
                icon={
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={this.close}>
                    <Icon name={'close'} color="#B6BCCA" size={20} />
                  </TouchableOpacity>
                }
              />
            </Animated.View>
            <View style={styles.itemsContainer}>
              {array.map((value, index) => (
                <TouchableOpacity key={index} style={styles.itemContainer}>
                  <View style={styles.startPart}>
                    <View style={styles.centerContainer}>
                      <Text style={styles.inviteText}>{value.title}</Text>
                      <Text style={styles.subTitle}>{value.subTitle}</Text>
                    </View>
                  </View>
                  <ChevronRight />
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  subTitle: {
    color: '#96AAC6',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  inviteText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  link: {
    fontSize: 14,
    color: '#96AAC6',
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  centerContainer: {
    marginHorizontal: 10,
  },
  startPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0EAF3',
  },
  itemsContainer: {
    paddingTop: 80,
  },
  overlay: {
    width,
    height,
    position: 'absolute',
    zIndex: 1000,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  container: {
    width,
    height,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    flex: 1,
    zIndex: 1000,
  },
  modalContainer: {
    marginTop: height - popoupHeight,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    marginHorizontal: 0,
    overflow: 'hidden',
    zIndex: 1001,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FA',
  },
  closeButton: {},
});

Component.defaultProps = {
  callbackClose: () => {},
  header: null,
  popupHeight: 500,
};
