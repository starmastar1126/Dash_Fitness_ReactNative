import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavBar from 'dash/src/components/NavBar';
import {BackArrow} from 'dash/src/components/Icons';

export default class extends React.Component {
  state = {
    currentIndex: 0,
  };
  renderTitle = () => {
    switch (this.state.currentIndex) {
      case 0:
        return 'Create Challenge';
      case 1:
        return 'Create Challenge';
      case 2:
        return 'Create Challenge';
      case 3:
        return 'Create Challenge';
      case 4:
        return 'Create Challenge';
      case 5:
        return 'Create Challenge';
      case 6:
        return 'All Set!';
      default:
        return '';
    }
  };
  next = () => {
    this.setState({currentIndex: this.state.currentIndex + 1});
  };
  prev = () => {
    this.setState({currentIndex: this.state.currentIndex - 1});
  };
  onPressBack = () => {
    const {onPressBack} = this.props;
    onPressBack();
    this.prev();
  };
  onPressNext = () => {
    const {onPressNext} = this.props;
    onPressNext();
    this.next();
  };
  iconRight = () => {
    const {challenge} = this.props;
    return <View style={{width: 30}} />
  };
  render() {
    const {closeCreateNew} = this.props;
    return (
      <NavBar
        title={this.renderTitle()}
        iconRight={this.iconRight()}
        icon={
          this.state.currentIndex !== 6 ? (
            this.state.currentIndex === 0 ? (
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeCreateNew}>
                <Icon name={'close'} color="#B6BCCA" size={20} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.backButton}
                onPress={this.onPressBack}>
                <BackArrow />
              </TouchableOpacity>
            )
          ) : (
            <View style={{width: 30}} />
          )
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  backButton: {width: 40, alignItems:"center"},
  next: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#1AA0FF',
  },
});
