import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Actions} from 'react-native-router-flux';

import Challenge from 'dash/src/components/Challenge';

export default function Component(props) {
 

  return props.array.map((value) => (
    <TouchableWithoutFeedback
      key={value._id}
      onPress={() => Actions.ChallengeDetail({challenge: value})}>
      <View>
        <Challenge value={value} />
      </View>
    </TouchableWithoutFeedback>
  ));
}

const styles = StyleSheet.create({});

Component.defaultProps = {};
