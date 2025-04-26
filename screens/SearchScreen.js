import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, ScrollView, Alert, TouchableOpacity } from 'react-native';

const MovieCard = ({ movie }) => {
  if (!movie || !movie.id) return null;
  
  const handlePress = () => {
    const movieDetails =  `
          Название: ${movie.title}
          Рейтинг:  ${movie.vote_average}
          Описание: ${movie.overview ? movie.overview : 'Нет опиисания'}
          `;

          Alert.alert(movie.title, movieDetails);

  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      {movies.poster_path ? (
        <Image
          source={{ uri : `https://image.tmdb.org/t/p/w500${movie.poster_path}`}}
          style={styles.poster}
          resizeMode="cover" 
        />
      ) : (
        <Text>No Image</Text>
        
      )}
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.rating}>Рейтинг:{movie.vote_average}</Text>
    </TouchableOpacity>
      ) 
    };

const SearchScreen = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieAndGenres = async () => {
      try {
        const movieResponse = await fetch(
          'https://api.themoviedb.org/3/movie/popular?api_key=5fc80399856d9cac31bcc9d7b3df256b&page=1'
        );
        const movieData = await response.json();
        setMovies(movieData.results);

        const genreResponse = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=5fc80399856d9cac31bcc9d7b3df256b`
        );
        const genreData = await genreResponse.json();
        setGengres(genreData.genres);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieAndGenres();
  }, []);
    if (loading) {
    return <ActivityIndicator size="large" color="#000111" />;
  }

  return (
    <ScrollView style={styles.container}>
      <FlatList
            data={movies}
            horizontal
            renderItem={({ item }) => <MovieCard movie={item} />}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            /> 


      {genres.slice(0, 2).map((genre) => (
        <View key={genre.id}>
          <Text style={styles.genreTitle}>{genre.name}</Text>
          <FlatList
            data={movies.filter((movie) => movie.genre_ids.includes(genre.id)).slice(0, 4)}

            horizontal
            renderItem={({ item }) => <MovieCard movie={item} />}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  card: {
    marginRight: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  title: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  genreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 5,
  },
  genreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 5,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SearchScreen;
