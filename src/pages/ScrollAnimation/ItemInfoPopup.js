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

const {height, width} = Dimensions.get('screen');

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
        Animated.spring(this.translateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      },
    );
  };
  close = () => {
    Animated.spring(this.translateY, {
      toValue: 1,
      duration: 500,
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
      outputRange: [0, height],
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
            <View style={styles.header}>
              <TouchableOpacity style={styles.closeButton} onPress={this.close}>
                <Icon name={'close'} color="#B6BCCA" size={20} />
              </TouchableOpacity>
              <Text style={styles.title}>{item.title}</Text>
              <Icon
                style={[styles.closeButton, {opacity: 0}]}
                name={'close'}
                color="#B6BCCA"
                size={20}
              />
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainerStyle}>
              <Image
                style={styles.imageStyle}
                resizeMode={'cover'}
                source={require('dash/src/res/previewSlide.png')}
              />
              <Text style={styles.info}>{item.info}</Text>
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
  contentContainerStyle: {
    paddingBottom: 40,
  },
  modalContainer: {
    marginTop: 100,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    marginHorizontal: 0,
    height: height - 100,
    overflow: 'hidden',
    zIndex: 1001,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FA'
  },
  closeButton: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    color: '#292E3A',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  info: {
    margin: 20,
    color: '#6F80A7',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  imageStyle: {
    height: width - 40,
    width,
  },
});

Component.defaultProps = {
  item: {
    title: 'czxczczxcz',
  },
  callbackClose: () => {},
};
