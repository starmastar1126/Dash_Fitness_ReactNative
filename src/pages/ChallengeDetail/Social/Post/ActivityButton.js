import React from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';

export default class Component extends React.Component {
  state = {
    active: false,
  };
  render() {
    const {enabled} = this.props;
    const {active} = this.state;
    const Icon = this.props.icon;
    const iconProps = {
      color: enabled || active ? '#1AA0FF' : '#21293D',
      fill: enabled || active ? '#1AA0FF' : 'none',
    };
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
        onPressIn={() => this.setState({active: true})}
        onPressOut={() => this.setState({active: false})}>
        <View style={styles.container}>
          <Icon {...iconProps} />
          <Text
            style={[
              styles.title,
              {
                color: active || enabled ? '#1AA0FF' : '#21293D',
              },
            ]}>
            {this.props.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 10,
    color: '#21293D',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    lineHeight: 14,
    marginTop: 2,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

Component.defaultProps = {
  onPress: () => {},
};
