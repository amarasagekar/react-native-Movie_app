import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const timeArray: string[] = [
  '10:30',
  '12:30',
  '14:30',
  '15:00',
  '19:30',
  '21:00',
];

const generateDate = () => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[
        new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate()
      ],
    };
    weekdays.push(tempDate);
  }
};
const SeatBookingScreen = () => {
  generateDate();
  return (
    <View style={styles.container}>
      <Text>SeatBookingScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SeatBookingScreen;
