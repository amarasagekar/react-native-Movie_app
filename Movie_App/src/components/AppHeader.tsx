import * as React from 'react';
import { Text, View, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import CustomIcon from './CustomIcon';



const componentName = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <CustomIcon/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
  });

  

export default componentName;

