import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import FriendItem from 'dash/src/components/FriendItem';
import { Actions } from 'react-native-router-flux';

const {height, width} = Dimensions.get('screen');

const array = [
  {
    name: 'Invite To Challenge',
    link: 'Send invite to a new or existing challenge.',
    onPress: () => Actions.InviteToChallenge()
  },
  {
    name: 'Remove Friend',
    link: 'Unfriend this person. ',
  },
  {
    name: 'Report',
    link: 'Unfriend this person. ',
  },
];

const array2 = [
  {
    name: 'Add Friend',
    link: 'Friend this person. ',
  },
  {
    name: 'Invite To Challenge',
    link: 'Send invite to a new or existing challenge.',
    onPress: () => Actions.InviteToChallenge()
  },
  {
    name: 'Report',
    link: 'Send invite to a new or existing challenge.',
  },
];

export default class Component extends React.Component {
  translateY = new Animated.Value(1);
  state = {
    visible: false,
    item: {},
  };
  open = (item) => {
    this.setState(
      {
        visible: true,
        item,
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
    Animated.timing(this.translateY, {
      toValue: 1,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        this.setState({visible: false, item: {}}, () => {
          this.props.callbackClose();
        });
      }
    });
  };
  render() {
    const {item} = this.state;
    const backgroundColor = this.translateY.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)'],
      extrapolate: 'clamp',
    });
    const translateY = this.translateY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 500],
      extrapolate: 'clamp',
    });
    const useArray = item.noFriend ? array2 : array;
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
            <View style={styles.header}>
              <TouchableOpacity style={styles.closeButton} onPress={this.close}>
                <Icon name={'close'} color="#B6BCCA" size={20} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <FriendItem
                value={item}
                underline={false}
                dots={false}
                enablePicture={true}
              />
              {useArray.map((value, index) => (
                <FriendItem
                  key={index}
                  value={value}
                  underline={true}
                  dots={false}
                  arrow={true}
                  enablePicture={false}
                />
              ))}
            </ScrollView>
          </Animated.View>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
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
    marginTop: height - 500,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    marginHorizontal: 0,
    height: 500,
    overflow: 'hidden',
    zIndex: 1001,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FA',
  },
  closeButton: {
    padding: 20,
  },
});

Component.defaultProps = {
  callbackClose: () => {},
};
