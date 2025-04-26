import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';

const API_KEY = '5fc80399856d9cac31bcc9d7b3df256b';

export default function HomeScreen() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
                );
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            {item.poster_path && (
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                    style={styles.poster}
                />
            )}
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.voteAverage}>Рейтинг: {item.vote_average}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Привет, Нурсултан!</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#000111" />
            ) : (
                <FlatList
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 21,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        width: 200,
        marginRight: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
    },
    poster: {
        width: '100%',
        height: 300,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    movieTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    voteAverage: {
        fontSize: 14,
        color: '#777',
        marginBottom: 10,
    },
});
