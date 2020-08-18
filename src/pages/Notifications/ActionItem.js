import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

export default function Component(props) {
  const {value} = props;
  return (
    <View style={styles.container}>
      <View style={styles.itemAvatarContainer}>
        <Image
          resizeMode="cover"
          source={value.avatar}
          style={styles.itemAvatar}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{value.name}</Text>
          <Text style={styles.link}>{value.link}</Text>
        </View>
        <Text style={styles.action}>{value.action}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#292E3A',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: '#96AAC6',
    marginLeft: 10,
    marginBottom: 2
  },
  name: {
    color: '#21293D',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  infoContainer: {
    marginLeft: 10,
  },
  itemAvatar: {
    width: 50,
    height: 50,
  },
  itemAvatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F5FA',
    borderRadius: 15,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
});

Component.defaultProps = {};
