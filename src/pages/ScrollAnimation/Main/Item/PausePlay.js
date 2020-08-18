import React from 'react';
import {View, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class extends React.Component {
  render() {
    return (
      <View style={[styles.container]}>
        <Icon name={this.props.name} color="#fff" size={40} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
