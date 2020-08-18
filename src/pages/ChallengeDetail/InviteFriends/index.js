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
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//
import _ from 'lodash';

import FriendItem from 'dash/src/components/FriendItem';
import {AddUser, ChevronRight, Check} from 'dash/src/components/Icons';
import NavBar from 'dash/src/components/NavBar';
import Search from 'dash/src/components/Search';

const {height, width} = Dimensions.get('screen');

const array = [
  {
    picture: require('dash/src/res/friends/friend1.png'),
    name: 'Cameron Mckinney',
    link: '@itsjuanita',
  },
  {
    picture: require('dash/src/res/friends/friend2.png'),
    name: 'Juanita Webb',
    link: 'Juanita Webb',
    noFriend: true,
  },
  {
    picture: require('dash/src/res/friends/friend3.png'),
    name: 'Randall Williamson',
    link: '@randallwilliamson',
  },
  {
    picture: require('dash/src/res/friends/friend4.png'),
    name: 'Regina Mccoy',
    link: '@reginamccoy',
    noFriend: true,
  },
  {
    picture: require('dash/src/res/friends/friend1.png'),
    name: 'Cameron Mckinney',
    link: '@itsjuanita',
  },
  {
    picture: require('dash/src/res/friends/friend2.png'),
    name: 'Juanita Webb',
    link: 'Juanita Webb',
  },
  {
    picture: require('dash/src/res/friends/friend3.png'),
    name: 'Randall Williamson',
    link: '@randallwilliamson',
  },
  {
    picture: require('dash/src/res/friends/friend4.png'),
    name: 'Regina Mccoy',
    link: '@reginamccoy',
  },
];

export default class Component extends React.Component {
  translateY = new Animated.Value(height - 100);
  ScrollViewAnimation = new Animated.Value(0);
  state = {
    visible: false,
    selectedFriend: [],
  };
  panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
      gestureState.dy > 5,
    onPanResponderGrant: (e, gestureState) => {},
    onPanResponderMove: Animated.event([null, {dx: 0, dy: this.translateY}], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > (height - 100) / 4) {
        Animated.timing(this.translateY, {
          toValue: height - 100,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(this.translateY, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      }
    },
  });
  open = () => {
    this.setState(
      {
        visible: true,
        selectedFriend: [],
      },
      () => {
        Animated.timing(this.translateY, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      },
    );
  };
  close = () => {
    this.props.callbackClose();
    Animated.timing(this.translateY, {
      toValue: height - 100,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        this.setState({visible: false});
      }
    });
  };
  onPress = (index) => {
    const selectedFriend = this.state.selectedFriend;
    const i = this.state.selectedFriend.indexOf(index);
    if (i !== -1) {
      selectedFriend.splice(i, 1);
    } else {
      selectedFriend.push(index);
    }
    this.setState({
      selectedFriend,
    });
  };
  render() {
    const {selectedFriend} = this.state;
    const backgroundColor = this.translateY.interpolate({
      inputRange: [0, height - 100],
      outputRange: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)'],
      extrapolate: 'clamp',
    });
    const translateY = this.translateY.interpolate({
      inputRange: [0, height - 100],
      outputRange: [0, height - 100],
      extrapolate: 'clamp',
    });
    const opacityLinear = this.ScrollViewAnimation.interpolate({
      inputRange: [0, 3],
      outputRange: [0, 1],
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
            ]}>
            <Animated.View
              style={styles.header}
              {...this.panResponder.panHandlers}>
              <NavBar
                title=""
                icon={
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={this.close}>
                    <Icon name={'close'} color="#B6BCCA" size={20} />
                  </TouchableOpacity>
                }
                iconRight={
                  selectedFriend.length !== 0 && (
                    <TouchableOpacity style={{width: 50}} onPress={this.close}>
                      <Text style={styles.save}>Invite</Text>
                    </TouchableOpacity>
                  )
                }
              />

              <Animated.View
                style={[
                  styles.linearGradientContainer,
                  {opacity: opacityLinear},
                ]}>
                <LinearGradient
                  colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.0001)']}
                  style={styles.linearGradient}
                />
              </Animated.View>
            </Animated.View>
            <ScrollView
              contentContainerStyle={{paddingBottom: 20, paddingTop: 40}}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {contentOffset: {y: this.ScrollViewAnimation}},
                  },
                ],
                {
                  useNativeDriver: false,
                },
              )}>
              <Text style={styles.title}>Invite Friends</Text>
              <Search placeholder="Search for Friends" />
              <TouchableOpacity
                style={styles.containerInviteToDash}
                onPress={() => {}}>
                <View style={styles.startPart}>
                  <View style={styles.pictureContainer}>
                    <AddUser />
                  </View>
                  <View style={styles.centerContainer}>
                    <Text style={styles.inviteText}>
                      Invite Friends to Dash
                    </Text>
                  </View>
                </View>
                <ChevronRight />
              </TouchableOpacity>
              <Text style={[styles.title, {marginTop: 40}]}>Your Friends</Text>
              <View style={styles.friendsContainer}>
                {array.map((value, index) => (
                  <FriendItem
                    key={index}
                    value={value}
                    onPress={() => this.onPress(index)}
                    rightComponent={
                      <View
                        style={[
                          styles.checkContainer,
                          selectedFriend.some((v) => v === index)
                            ? {}
                            : {backgroundColor: 'white'},
                        ]}>
                        <Check />
                      </View>
                    }
                  />
                ))}
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  checkContainer: {
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: '#1AA0FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0F5FA',
  },
  friendsContainer: {},
  title: {
    color: '#292E3A',
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginHorizontal: 15,
  },
  inviteText: {
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  centerContainer: {
    marginHorizontal: 10,
  },
  startPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerInviteToDash: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0EAF3',
  },
  pictureContainer: {
    width: 56,
    height: 56,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#F0F5FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  save: {
    color: '#1AA0FF',
    fontFamily: 'Poppins-Bold',
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
  overlay: {
    width,
    height,
    position: 'absolute',
    zIndex: 1000,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
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
    marginTop: 100,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    marginHorizontal: 0,
    flex: 1,
    height: height - 100,
    overflow: 'hidden',
    zIndex: 1001,
  },
  header: {
    zIndex: 1000,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    width: 40,
  },
});

Component.defaultProps = {
  callbackClose: () => {},
};
