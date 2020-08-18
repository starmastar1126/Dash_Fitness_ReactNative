import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';

import NavBar from 'dash/src/components/NavBar';
import {Close} from 'dash/src/components/Icons';

import * as PostActions from 'dash/src/actions/posts';

import AddFile from './AddFile';

import {mediaHost} from 'dash/src/config';
import {Actions} from 'react-native-router-flux';

class Component extends React.Component {
  inputRef;
  state = {
    detail: '',
    picture: null,
    loading: false,
  };
  componentDidMount() {
    if (this.props.photo) {
      Actions.CameraRoll({
        onePhoto: true,
        callbackCamera: (item) => {
          this.setState({picture: item.node});
        },
      });
    }
    if (this.inputRef) {
      setTimeout(() => {
        this.inputRef.focus();
      }, 100);
    }
  }

  createPost = async () => {
    try {
      const {detail, picture} = this.state;
      const {challenge} = this.props;
      this.setState({loading: true});
      const data = {
        detail,
        challengeId: challenge._id,
        creationDate: new Date().toUTCString(),
      };
      if (picture) {
        data.picture = picture.image;
      }
      await PostActions.addPost(data);
      this.setState({loading: false}, () => {
        Actions.pop();
      });
    } catch (e) {
      console.log(e.message);
      this.setState({loading: false});
    }
  };

  render() {
    const {detail, picture, loading} = this.state;
    const {user, challenge} = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          title="Create Post"
          iconRightPadding={0}
          styleContainer={{paddingRight: 0}}
          iconRight={
            <View style={styles.iconRight}>
              {loading ? (
                <ActivityIndicator
                  size="small"
                  color={EStyleSheet.value('$lightBlue')}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    if (detail.length !== 0 || picture) {
                      this.createPost();
                    }
                  }}>
                  <Text
                    style={[
                      styles.postButton,
                      {
                        color:
                          detail.length !== 0 || picture
                            ? EStyleSheet.value('$lightBlue')
                            : '#96AAC6',
                      },
                    ]}>
                    Post
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          }
        />
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          enableOnAndroid={true}
          extraScrollHeight={100}>
          <View style={styles.top}>
            <View style={styles.avatarContainer}>
              <Image
                source={{uri: `${mediaHost}${user.profileImage}`}}
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>
            <View style={styles.topCenter}>
              <View style={styles.usernameContainer}>
                <Text style={styles.username}>{user.username}</Text>
              </View>
              <Text style={styles.date}>{challenge.title}</Text>
            </View>
          </View>
          <TextInput
            ref={(e) => (this.inputRef = e)}
            multiline={true}
            value={detail}
            onChangeText={(detail) => this.setState({detail})}
            style={styles.input}
            placeholderTextColor="#96AAC6"
            placeholder="Write something..."
          />
          {picture && (
            <View style={styles.imageContainer}>
              <Image
                resizeMode="cover"
                style={styles.image}
                source={{uri: picture.image.uri}}
              />
              <TouchableOpacity
                style={styles.deleteImage}
                onPress={() => this.setState({picture: null})}>
                <Close />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        {!picture && (
          <AddFile
            onPress={(picture) => {
              this.setState({picture});
            }}
          />
        )}
      </View>
    );
  }
}

export default connect(({user}) => ({
  user,
}))(Component);

const styles = EStyleSheet.create({
  iconRight: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 20,
  },
  imageContainer: {
    overflow: 'hidden',
    width: '100%',
    borderRadius: 25,
    height: 200,
  },
  image: {
    width: '100%',
    height: 200,
  },
  input: {
    color: '#292E3A',
    fontFamily: 'Poppins-Medium',
    flex: 1,
    height: '100%',
  },
  topCenter: {
    flex: 1,
    marginLeft: 20,
  },
  date: {
    marginTop: -5,
    color: '#586178',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
  },
  username: {
    fontFamily: 'Poppins-Bold',
    color: '#21293D',
    lineHeight: 24,
    fontSize: 14,
    marginRight: 10,
  },
  usernameContainer: {
    marginTop: -2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {width: 35, height: 35},
  avatarContainer: {
    width: 35,
    height: 35,
    borderRadius: 18,
    overflow: 'hidden',
  },
  top: {
    flexDirection: 'row',
  },
  contentContainerStyle: {
    paddingTop: 100,
    paddingHorizontal: 15,
    marginBottom: 100,
  },
  postButton: {
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#96AAC6',
    lineHeight: 20,
  },
  container: {
    flex: 1,
  },
});
