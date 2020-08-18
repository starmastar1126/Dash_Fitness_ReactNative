import React from 'react';
import {View, StyleSheet} from 'react-native';

import Main from './Main';

import ItemInfoPopup from './ItemInfoPopup';
import ReplaceExcercise from './ReplaceExcercise';

export default class extends React.Component {
  ItemInfoPopupRef = React.createRef(null);
  ReplaceExcerciseRef = React.createRef(null);

  openInfoPopup = (item) => {
    this.ItemInfoPopupRef.current.open(item);
  };

  openReplaceExcercise = (item) => {
    this.ReplaceExcerciseRef.current.open(item);
  };

  render() {
    return (
      <View style={styles.container}>
        <Main
          openInfoPopup={this.openInfoPopup}
          openReplaceExcercise={this.openReplaceExcercise}
        />
        <ItemInfoPopup ref={this.ItemInfoPopupRef} />
        <ReplaceExcercise ref={this.ReplaceExcerciseRef} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
