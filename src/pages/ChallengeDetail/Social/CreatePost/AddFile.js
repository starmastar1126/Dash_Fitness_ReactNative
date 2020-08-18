import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {Camera} from 'dash/src/components/Icons';
import {Actions} from 'react-native-router-flux';

export default function Component(props) {
  const {onPress} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.innerContainer}
        onPress={() =>
          Actions.CameraRoll({
            onePhoto: true,
            callbackCamera: (item) => {
              onPress(item.node);
            },
          })
        }>
        <View style={styles.photoContainer}>
          <Camera
            color={EStyleSheet.value('$lightBlue')}
            height="17"
            width="17"
          />
        </View>
        <Text style={styles.text}>Add Photo/Video</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = EStyleSheet.create({
  text: {
    color: '#21293D',
    marginLeft: 15,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
  },
  photoContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#E9F6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#F0F5FA',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,

    backgroundColor: 'white',
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

Component.defaultProps = {};
