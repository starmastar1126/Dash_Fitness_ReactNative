import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const array = [
  {
    number: '1.0',
    text: 'This is the best place to start your stregnth journey.',
    recomended: true,
  },
  {
    number: '2.0',
    text: 'This is the best place to start your stregnth journey.',
    recomended: false,
  },
  {
    number: '3.0',
    text: 'This is the best place to start your stregnth journey.',
    recomended: false,
  },
];

export default function Component(props) {
  const {onPress} = props;
  return (
    <View style={styles.container}>
      {array.map((value, index) => (
        <TouchableOpacity
          key={index}
          style={styles.itemContainer}
          onPress={() => onPress(value)}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{value.number}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{value.text}</Text>
            {value.recomended && (
              <View style={styles.globeContainer}>
                <Text style={styles.publicText}>Recommended</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  publicText: {
    fontSize: 10,
    color: '#1AA0FF',
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.9,
    lineHeight: 13,
  },
  globeContainer: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9F6FF',
    borderRadius: 24,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  text: {
    color: '#21293D',
    lineHeight: 24,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  circleText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  circle: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#00A1FF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#F0F5FA',
    borderRadius: 15,
    overflow: 'hidden',
  },
  container: {
    marginTop: 40,
    flex: 1,
  },
});

Component.defaultProps = {};
