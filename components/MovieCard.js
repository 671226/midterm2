import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Touchable, TouchableOpacity, Modal } from 'react-native';

const MovieCard = ({ movie }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [movieDetails, setMovieDetails] = useState('');

  const handlePress = () => {
    const details = ` 
      Название: ${movie.title}
      Рейтинг:  ${movie.vote_average}
      Описание: ${movie.overview ? movie.overview : 'Нет опиисания'}
      `;
      setMovieDetails(details);
      setModalVisible(true);
  };
    

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      {movie.poster_path ? (
      <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
          resizeMode="cover"
        />

      ) : (
        <Text>No Image Available</Text>
      )}
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.rating}>Рейтинг{movie.vote_average}</Text>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}> {movie.title}</Text>
            <Text style={styles.modalText}>{movieDetails}</Text>
            <Button title="Закрыть" onPress={() => setModalVisible(false)}/>
          </View>
          </View>
        </Modal>
        </TouchableOpacity>
  );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f0f0f0',
  },
  card: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8',
    borderRadius: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  poster: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
