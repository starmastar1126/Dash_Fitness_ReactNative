import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import _ from 'lodash';

import Gender from 'dash/src/components/Gender';
import InformationContainer, {
  Title,
} from 'dash/src/components/InformationContainer';

export default function Component(props) {
  const {onChangeText, user} = props;
  const array = [
    {
      label: 'Name',
      field: 'displayname',
      value:   user.displayname? user.displayname:'',
      edit: true,
    },
    {
      label: 'Username',
      field: 'username',
      value: user.username,
      edit: false,
    },
    {
      label: 'Email',
      field: 'email',
      value: user.email,
      edit: true,
    },
    {
      label: 'Phone Number',
      field: 'phoneNumber',
      value: user.phoneNumber,
      edit: true,
    },
  ];
  return (
    <View style={styles.container}>
      <InformationContainer
        title={'General Info'}
        items={array}
        onChangeText={onChangeText}
      />
      <Title>Gender</Title>
      <Gender
        onChange={(value) => {
          onChangeText(
            {
              field: 'gender',
            },
            value,
          );
        }}
        value={user.gender}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 100,
  },
});

Component.defaultProps = {};
