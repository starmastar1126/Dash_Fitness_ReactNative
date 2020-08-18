import React, {useState} from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';

import * as PostsActions from 'dash/src/actions/posts';

import {mediaHost} from 'dash/src/config';

import {Camera, SendMessage} from 'dash/src/components/Icons';
import {Actions} from 'react-native-router-flux';

function Component(props) {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const {
    containerProps,
    user,
    commit,
    value,
    scrollToEnd,
    onPress,
    onPressPhoto,
  } = props;
  const createCommitPicture = async () => {
    if (commit) {
      Actions.CameraRoll({
        onePhoto: true,
        callbackCamera: async (item) => {
          try {
            setLoading(true);
            const res = await PostsActions.addCommit({
              editPostID: value._id,
              commitIds: user._id,
              commitTypes: 'picture',
              commitDetails: '',
              picture: item.node.image,
            });
            setLoading(false);
          } catch (e) {
            console.log(e.message);
            console.log(e.response);
            setLoading(false);
          }
        },
      });
    }
  };
  const createCommit = async () => {
    if (commit) {
      try {
        setLoading(true);
       
        await PostsActions.addCommit({
          editPostID: value._id,
          commitDetails: text,
          commitIds: user._id,
          commitTypes: 'default',
        });
        setLoading(false);
        setText('');
      } catch (e) {
        console.log(e.message);
        console.log(e.response);
        setLoading(false);
      }
    }
  };
  const Icon = text.length === 0 ? Camera : SendMessage;
  return (
    <View style={styles.writeContainer} {...containerProps}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (onPress) {
            onPress();
          }
        }}>
        <View style={styles.MyAvatarContainer}>
          <Image
            source={{uri: `${mediaHost}${user.profileImage}`}}
            style={styles.MyAvatar}
            resizeMode="cover"
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          if (onPress) {
            onPress();
          }
        }}>
        <View style={styles.inputContainer}>
          <View style={{flex: 1}} pointerEvents={onPress ? 'none' : 'auto'}>
            <TextInput
              value={text}
              onFocus={() => {
                scrollToEnd();
              }}
              onChangeText={(text) => setText(text)}
              style={styles.input}
              placeholder="Write Something..."
              placeholderTextColor="#96AAC6"
              {...props.inputProps}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity
        style={styles.photoContainer}
        onPress={() => {
          if (onPressPhoto) {
            onPressPhoto();
          } else {
            if (text.length !== 0) {
              createCommit();
            } else {
              createCommitPicture();
            }
          }
        }}>
        <Icon color={EStyleSheet.value('$lightBlue')} height="17" width="17" />
      </TouchableOpacity>
    </View>
  );
}
export default connect(({user}) => ({
  user,
}))(Component);

const styles = EStyleSheet.create({
  photoContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#E9F6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {flex: 1, fontFamily: 'Poppins-Bold', color: 'black'},
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  MyAvatar: {width: 35, height: 35},
  MyAvatarContainer: {
    width: 35,
    height: 35,
    borderRadius: 18,
    overflow: 'hidden',
  },
  writeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

Component.defaultProps = {};
