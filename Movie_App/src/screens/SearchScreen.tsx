import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import {baseImagePath, searchMovies} from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import SubMovieCard from '../components/SubMovieCard';

const {width, height} = Dimensions.get('screen');

const SearchScreen = ({navigation}: any) => {
  const [searchList, setSearchList] = useState([]);

  const searchMoviesFunction = async (name: string) => {
    try {
      let response = await fetch(searchMovies(name));
      let json = await response.json();
      setSearchList(json.results);
    } catch (error) {
      console.error('Something went wrong in searchMoviesFunction');
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View>
        <FlatList
          data={searchList}
          keyExtractor={(item: any) => item.id}
          bounces={false}
          numColumns={2}
          ListHeaderComponent={
            <View style={styles.InputHeaderContainer}>
              <InputHeader searchFunction={searchMoviesFunction} />
            </View>
          }
          contentContainerStyle={styles.centerContainer}
          renderItem={({item, index}) => (
            <SubMovieCard
              shouldMarginatedAtEnd={false}
              shoulMarginatedAround={true}
              cardFunction={() => {
                navigation.push('MovieDetails', {movieid: item.id});
              }}
              cardWidth={width / 2 - SPACING.space_12 * 2}
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width,
    alignItems: 'center',
    backgroundColor: COLORS.Black,
  },
  InputHeaderContainer: {
    display: 'flex',
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
    marginBottom: SPACING.space_28 - SPACING.space_12,
  },
  centerContainer: {
    alignItems: 'center',
  },
});

export default SearchScreen;
