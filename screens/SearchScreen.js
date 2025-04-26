import React from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import MovieCard from '../components/MovieCard';

const SearchScreen = ({ popularMovies, genres, loading, error }) => {
  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : error ? (
        <View>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={popularMovies}
            horizontal
            renderItem={({ item }) => <MovieCard movie={item} />}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          />
        </>
      )}

      {genres.slice(0, 2).map((genre) => (
        <View key={genre.id}>
          <Text style={styles.genreTitle}>{genre.name}</Text>

          <FlatList
            data={popularMovies
              .filter((movie) => movie.genre_ids.includes(genre.id))
              .slice(0, 4)
            }
            horizontal
            renderItem={({ item }) => <MovieCard movie={item} />}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3deed',
    paddingTop: 20,
    paddingHorizontal: 10,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    height: 40,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 5,
  },
  genreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 5,
    color: '#2c3e50',
  },
  errorMessage: {
    color: '#e74c3c',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SearchScreen;
