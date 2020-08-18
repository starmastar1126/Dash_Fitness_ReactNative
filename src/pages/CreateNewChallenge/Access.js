import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {LockClose, LockOpen, Check} from 'dash/src/components/Icons';

export default function Component(props) {
  const {challenge, onChangeSwitch} = props;
  return (
    <>
      <TouchableOpacity
        style={[styles.item, {marginTop: 25}]}
        onPress={() => onChangeSwitch(true)}>
        <View
          style={[styles.circle, {backgroundColor: 'rgba(38, 178,35,0.1)'}]}>
          <LockOpen height={25} width={25} />
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>Public</Text>
          <Text style={styles.subTitle}>Anyone with link can join.</Text>
        </View>
        {challenge.public && (
          <View style={[styles.checkContainer]}>
            <Check />
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => onChangeSwitch(false)}>
        <View
          style={[styles.circle, {backgroundColor: 'rgba(255, 34,114,0.1)'}]}>
          <LockClose height={25} width={25} />
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>Private</Text>
          <Text style={styles.subTitle}>Only invited users can join.</Text>
        </View>
        {challenge.public === false && (
          <View style={[styles.checkContainer]}>
            <Check />
          </View>
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    color: '#21293D',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  title: {
    color: '#21293D',
    fontFamily: 'Poppins-Bold',
  },
  checkContainer: {
    height: 22,
    width: 22,
    borderRadius: 15,
    backgroundColor: '#1AA0FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0F5FA',
  },
  body: {
    flex: 1,
    paddingLeft: 15,
  },
  circle: {
    width: 65,
    height: 65,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  item: {
    marginTop: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F5FA',
    borderRadius: 15,
    overflow: 'hidden',
  },
});

Component.defaultProps = {};
