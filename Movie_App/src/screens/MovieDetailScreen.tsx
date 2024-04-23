import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const MovieDetailsScreen = ({navigation, route}: any) => {
  const [movieData, setMovieData] = useState(undefined);
  const [movieCastData, setMovieCastData] = useState<any>(undefined);

  return (
    <View style={styles.container}>
      <Text>MovieDetailsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default MovieDetailsScreen;
