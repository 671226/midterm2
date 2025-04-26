import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MovieCard from '../components/MovieCard';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=5fc80399856d9cac31bcc9d7b3df256b&page=1'
      );
      const data = await response.json();
      const sortedMovies = data.results.sort((a, b) => b.vote_average - a.vote_average);
      setMovies(sortedMovies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMovies();
    }, [fetchMovies])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Добро пожаловать в MovieApp!</Text>
        <Text style={styles.subTitle}>Фильмы с высоким рейтингом</Text>
      </View>

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
    backgroundColor: '#d3deed',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  headerContainer: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#7fb5b5',
    borderRadius: 10,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e3deda',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#e3deda',
    marginTop: 10,
  },
});

export default HomeScreen;
