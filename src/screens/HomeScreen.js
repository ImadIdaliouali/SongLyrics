import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { getSearch } from '../services';
import { COLORS, FONTS, SIZES } from '../constants';
import { SongCard } from '../components';

const HomeScreen = () => {
    const [search, setSearch] = useState("");
    const [songs, setSongs] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getSongs = () => {
        setIsLoading(true);
        getSearch(search)
            .then(response => setSongs(response.data.response.hits))
            .catch(error => alert(error))
            .finally(() => setIsLoading(false));
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={COLORS.lightWhite}
            />
            <Text style={styles.header}>Song Lyrics</Text>
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setSearch(text)}
                        placeholder="Search lyrics & more"
                    />
                </View>
                <TouchableOpacity style={styles.searchBtn} onPress={() => getSongs()}>
                    <Icon
                        name="search"
                        size={22}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.songsContainer}>
                {isLoading
                    ? <ActivityIndicator size="large" color={COLORS.green} />
                    : (songs
                        ? <FlatList
                            data={songs}
                            keyExtractor={item => item.result.id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => <SongCard
                                title={item.result.title}
                                artist={item.result.artist_names}
                                albumArt={item.result.song_art_image_url}
                            />}
                        />
                        : null)}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
        paddingHorizontal: SIZES.medium,
    },
    header: {
        fontFamily: FONTS.BOLD,
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        marginTop: SIZES.small,
        textAlign: "center",
    },
    searchContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: SIZES.large,
        height: 50,
    },
    searchWrapper: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginRight: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.medium,
        height: "100%",
        elevation: 2,
    },
    input: {
        fontFamily: FONTS.REGULAR,
        width: "100%",
        height: "100%",
        paddingHorizontal: SIZES.medium,
    },
    searchBtn: {
        width: 50,
        height: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
    },
    songsContainer: {
        flex: 1,
        paddingTop: SIZES.small,
    }
});

export default HomeScreen;