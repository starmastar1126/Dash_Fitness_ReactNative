import React, {useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import ChallengeTypeContainer from 'dash/src/components/ChallengeTypeContainer';

import * as plansActions from 'dash/src/actions/plans';

export default function Component(props) {
  const [loading, setLoading] = useState(false);
  const [array, setArray] = useState([]);
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const data = await plansActions.getPlans();
        console.log("categories1.....", data)
        setArray(data);
        setLoading(false);
      } catch (e) {}
    };
    init();
  }, []);
  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={EStyleSheet.value('$lightBlue')}
        />
      ) : (
        array.map((value, index) => (
          <ChallengeTypeContainer
            key={index}
            item={value}
            onPress={() => props.onPress(value)}
            containerStyle={{marginBottom: 20}}
          />
        ))
      )}
    </>
  );
}

const styles = StyleSheet.create({});

Component.defaultProps = {};
