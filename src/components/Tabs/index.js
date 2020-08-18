import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function Component(props) {
  const {activeIndex, titlesArray} = props;
  return (
    <View style={styles.container}>
      {titlesArray.map((value, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.item,
            index === activeIndex
              ? {
                  backgroundColor: 'white',
                }
              : {},
          ]}>
          <Text
            style={[
              styles.tabText,
              index === activeIndex
                ? {
                    color: '#00A1FF',
                  }
                : {},
            ]}>
            {value.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    lineHeight: 20,
    color: 'white',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: 10,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(33, 41, 61, 0.05)',
    borderRadius: 10,
    padding: 2,
    marginHorizontal: 15,
    overflow: 'hidden',
    marginBottom: 25,
  },
});

Component.defaultProps = {
  activeIndex: 0,
  titlesArray: [{title: 'Current'}, {title: 'Previous'}],
};
