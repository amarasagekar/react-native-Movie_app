import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../theme/theme';

const HomeScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.push('MovieDetails');
        }}>
        <Text>HomeScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black,
  },
});

export default HomeScreen;
