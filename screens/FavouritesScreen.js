import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const MovieCard = ({ movie }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [movieDetails, setMovieDetails] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkIfFavorite();
  }, []);

  const handlePress = () => {
    const details = `
      Название: ${movie.title}
      Рейтинг: ${movie.vote_average}
      Описание: ${movie.overview ? movie.overview : 'Нет описания'}
    `;
    setMovieDetails(details);
    setModalVisible(true);
  };

  const checkIfFavorite = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favorites');
      const favorites = jsonValue != null ? JSON.parse(jsonValue) : [];
      const exists = favorites.some((fav) => fav.id === movie.id);
      setIsFavorite(exists);
    } catch (error) {
      console.error('Ошибка при проверке избранного:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favorites');
      const favorites = jsonValue != null ? JSON.parse(jsonValue) : [];

      let newFavorites;
      if (isFavorite) {
        newFavorites = favorites.filter((fav) => fav.id !== movie.id);
      } else {
        newFavorites = [...favorites, movie];
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Ошибка при добавлении в избранное:', error);
    }
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
        <Text style={styles.noImageText}>No Image Available</Text>
      )}

      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.rating}>Рейтинг: {movie.vote_average}</Text>

      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorite ? 'red' : 'gray'}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{movie.title}</Text>
            <Text style={styles.modalText}>{movieDetails}</Text>
            <Button title="Закрыть" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  poster: {
    width: '100%',
    height: 250,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 10,
    textAlign: 'center',
  },
  rating: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 5,
  },
  noImageText: {
    color: '#7f8c8d',
    textAlign: 'center',
  },
  favoriteButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#e3deda',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default MovieCard;
