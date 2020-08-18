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
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {height, width} = Dimensions.get('screen');

const array = [
  {
    picture: require('dash/src/res/list_image.png'),
    title: 'Swiss Ball Torso Twist',
    subTitle: 'Base',
  },
  {
    picture: require('dash/src/res/list_image.png'),
    title: 'Swiss Ball Torso Twist',
    subTitle: 'Advanced',
  },
  {
    picture: require('dash/src/res/list_image.png'),
    title: 'Swiss Ball Torso Twist',
    subTitle: 'Base',
  },
  {
    picture: require('dash/src/res/list_image.png'),
    title: 'Swiss Ball Torso Twist',
    subTitle: 'Easier',
  },
];

export default class Component extends React.Component {
  translateY = new Animated.Value(1);
  state = {
    visible: false,
    item: {},
    checkedIndex: 0,
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
  onPress = (index) => {
    this.setState({
      checkedIndex:index
    }, () => {
      this.close()
    })
  }
  render() {
    const backgroundColor = this.translateY.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)'],
      extrapolate: 'clamp',
    });
    const translateY = this.translateY.interpolate({
      inputRange: [0, 1],
      outputRange: [height / 2, height],
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
              <Text style={styles.title}>Replace Excercise</Text>
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
              {array.map((value, index) => (
                <TouchableOpacity key={index} style={styles.item} onPress={() => this.onPress(index)} >
                  <Image source={value.picture} style={styles.picture} />
                  <View style={styles.textContainer}>
                    <View style={styles.textInnerContainer}>
                      <Text style={styles.itemTitle}>{value.title}</Text>
                      <Text style={styles.itemSubTitle}>{value.subTitle}</Text>
                    </View>
                    {this.state.checkedIndex === index && (
                      <View style={styles.iconContainer}>
                        <Icon name={'check'} color="#fff" size={15} />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
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
    marginTop: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    marginHorizontal: 0,
    height: height / 2,
    overflow: 'hidden',
    zIndex: 1001,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FA',
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
  item: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  picture: {
    width: 72,
    height: 72,
    borderRadius: 16,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInnerContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  iconContainer: {
    padding: 5,
    backgroundColor: '#00A1FF',
    borderRadius: 15,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemSubTitle: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#96AAC6',
  },
});

Component.defaultProps = {
  item: {
    title: '',
  },
  callbackClose: () => {},
};
