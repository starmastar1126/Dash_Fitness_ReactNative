import * as React from 'react';
import {StyleSheet, View, Image, Platform} from 'react-native';

export default class extends React.PureComponent {
  render() {
    const {
      data: {source},
    } = this.props;
    return (
      <View style={styles.container}>
        <Image style={styles.image} {...{source}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  input: {
    borderWidth: 2,
    borderColor: 'white',
    height: 28,
    width: 250,
    borderRadius: Platform.OS === 'android' ? 0 : 10,
  },
});