import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import {
  upcomingMovies,
  nowPlayingMovies,
  popularMovies,
  baseImagePath,
} from '../api/apicalls';

import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const {width, height} = Dimensions.get('window');

const getNowPlayingMoviesList = async () => {
  try {
    let reaponse = await fetch(nowPlayingMovies);
    let json = await reaponse.json();
    return json;
  } catch (error) {
    console.error(
      'Something went wrong in getNowPlayingMoviesList function',
      error,
    );
  }
};

const getPopularMoviesList = async () => {
  try {
    let reaponse = await fetch(popularMovies);
    let json = await reaponse.json();
    return json;
  } catch (error) {
    console.error(
      'Something went wrong in getPopularMoviesList function',
      error,
    );
  }
};

const getUpcomingMoviesList = async () => {
  try {
    let reaponse = await fetch(upcomingMovies);
    let json = await reaponse.json();
    return json;
  } catch (error) {
    console.error(
      'Something went wrong in getUpcomingMoviesList function',
      error,
    );
  }
};

const HomeScreen = ({navigation}: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] =
    useState<any>(undefined);

  const [popularMoviewList, setPopularMoviewList] = useState<any>(undefined);
  const [upcomingMovieList, setUpcomingMovieList] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      let tempNowPlaying = await getNowPlayingMoviesList();
      setNowPlayingMoviesList([
        {id: 'dummy1'},
        ...tempNowPlaying.results,
        {id: 'dummy2'},
      ]);

      let tempUpcoming = await getUpcomingMoviesList();
      setUpcomingMovieList(tempUpcoming.results);

      let tempPopular = await getPopularMoviesList();
      setPopularMoviewList(tempPopular.results);
    })();
  }, []);

  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  };

  if (
    nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    popularMoviewList == undefined &&
    popularMoviewList == null &&
    upcomingMovieList == undefined &&
    upcomingMovieList == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />

        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>

        <View style={styles.loadinContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
        <CategoryHeader title={'Now Playing'} />
        <FlatList
          data={nowPlayingMoviesList}
          keyExtractor={(item: any) => item.id}
          bounces={false}
          snapToInterval={width * 0.7 + SPACING.space_36}
          horizontal
          decelerationRate={0}
          contentContainerStyle={styles.containerGap36}
          renderItem={({item, index}) => {
            if (!item.original_title) {
              return (
                <View
                  style={{
                    width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                  }}></View>
              );
            }
            return (
              <MovieCard
                shouldMarginatedAtEnd={true}
                cardFunction={() => {
                  navigation.push('MovieDetails', {movieid: item.id});
                }}
                cardWidth={width * 0.7}
                title={item.original_title}
                isFirst={index == 0 ? true : false}
                isLast={index == upcomingMovieList?.length - 1 ? true : false}
                imagePath={baseImagePath('w780', item.poster_path)}
                genre={item.genre_ids.slice(1, 4)}
                vote_average={item.vote_average}
                vote_count={item.vote_count}
              />
            );
          }}
        />
        <CategoryHeader title={'Popular'} />
        <FlatList
          data={popularMoviewList}
          keyExtractor={(item: any) => item.id}
          bounces={false}
          horizontal
          contentContainerStyle={styles.containerGap36}
          renderItem={({item, index}) => (
            <SubMovieCard
              shouldMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetails', {movieid: item.id});
              }}
              cardWidth={width / 3}
              title={item.original_title}
              isFirst={index == 0 ? true : false}
              isLast={index == upcomingMovieList?.length - 1 ? true : false}
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
        <CategoryHeader title={'Upcoming'} />
        <FlatList
          data={upcomingMovieList}
          keyExtractor={(item: any) => item.id}
          bounces={false}
          horizontal
          contentContainerStyle={styles.containerGap36}
          renderItem={({item, index}) => (
            <SubMovieCard
              shouldMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetails', {movieid: item.id});
              }}
              cardWidth={width / 3}
              title={item.original_title}
              isFirst={index == 0 ? true : false}
              isLast={index == upcomingMovieList?.length - 1 ? true : false}
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
      </ScrollView>
    );
  }
  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      contentContainerStyle={styles.scrollViewContainer}>
      <StatusBar hidden />

      <View style={styles.InputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadinContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
});

export default HomeScreen;
