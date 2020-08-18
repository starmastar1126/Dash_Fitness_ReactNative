import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import moment from 'moment';

import {CalendarList} from 'react-native-calendars';

import {BackArrow} from 'dash/src/components/Icons';

const {height, width} = Dimensions.get('screen');

export default function Component(props) {
  const {challenge, onPress} = props;
  return (
    <>
      <View style={styles.weekContainer}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((val) => (
          <Text style={styles.weekDay} key={val}>
            {val}
          </Text>
        ))}
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 60}}>
        <CalendarList
          calendarWidth={width}
          pastScrollRange={0}
          futureScrollRange={6}
          scrollEnabled={false}
          current={new Date()}
          minDate={new Date()}
          onDayPress={(day) => {
            onPress(day.dateString);
          }}
          monthFormat={'MMM'}
          hideArrows={false}
          markedDates={
            challenge.startDate
              ? {
                  [moment(challenge.startDate).format('YYYY-MM-DD')]: {
                    selected: true,
                    marked: true,
                  },
                }
              : {}
          }
          renderArrow={(direction) => null}
          dayComponent={(args) => {
            const selected = challenge.startDate === args.date.dateString;
            const min = args.date.timestamp < new Date().getTime();
            const color = selected ? 'white' : min ? '#6F80A7' : '#1A1A1C';
            const backgroundColor = selected
              ? '#1AA0FF'
              : min
              ? '#fff'
              : '#F7F9FB';
            return (
              <TouchableOpacity
                style={[styles.dayContainer, {backgroundColor}]}
                onPress={() => args.onPress(new Date(args.date.timestamp))}>
                <Text style={[styles.dayText, {color}]}>{args.date.day}</Text>
              </TouchableOpacity>
            );
          }}
          hideExtraDays={true}
          firstDay={1}
          hideDayNames={true}
          showWeekNumbers={false}
          theme={{
            monthTextColor: '#292E3A',
            textDayHeaderFontFamily: 'Poppins-Bold',
            textMonthFontFamily: 'Poppins-Bold',
          }}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  weekDay: {
    width: 35,
    textAlign: 'center',
    color: '#292E3A',
    fontFamily: 'Poppins-Bold',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    color: '#1AA0FF',
    fontFamily: 'Poppins-Bold',
  },
  messageContainer: {
    marginTop: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9F6FF',
    borderRadius: 15,
  },
  dayText: {
    color: '#1A1A1C',
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
  },
  dayContainer: {
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F9FB',
  },
});

Component.defaultProps = {};
