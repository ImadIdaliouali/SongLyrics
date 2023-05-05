import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { getArtistById, getArtistSongs } from '../services';
import { COLORS, FONTS, SIZES } from '../constants';
import { SongCard } from '../components';

const ArtistScreen = ({ navigation, route }) => {
    const { artistId } = route.params;

    const [artist, setArtist] = useState({});
    const [songs, setSongs] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getArtistById(artistId)
            .then(response => setArtist(response.data.response.artist))
            .catch(error => alert(error));
        getArtistSongs(artistId)
            .then(response => setSongs(response.data.response.songs))
            .catch(error => alert(error))
            .finally(() => setIsLoading(false));
    }, []);

    return isLoading
        ? (
            <View style={{ ...styles.container, ...styles.center }}>
                <ActivityIndicator size="large" color={COLORS.green} />
            </View>
        )
        : (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
                        <Feather
                            name="chevron-left"
                            size={35}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.topContainer}>
                    <Image
                        source={{ uri: artist?.image_url }}
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                    <View style={styles.row}>
                        <Text style={styles.name}>{artist?.name}</Text>
                        {artist?.is_verified
                            ? <MaterialIcons
                                name="verified"
                                size={SIZES.large}
                                color={COLORS.blue}
                            />
                            : null}
                    </View>
                    <Text style={styles.username}>@{artist?.instagram_name}</Text>
                </View>
                <Text style={styles.aboutTitle}>Popular {artist?.name} songs</Text>
                <View style={styles.songsContainer}>
                    <FlatList
                        data={songs}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <SongCard
                            title={item.title}
                            artist={item.artist_names}
                            albumArt={item.song_art_image_url}
                            onPress={() => navigation.push("details", { songId: item.id })}
                        />}
                    />
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
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        position: "absolute",
        top: 20,
        elevation: 20,
    },
    topContainer: {
        alignItems: "center",
        paddingTop: SIZES.xLarge,
    },
    avatar: {
        height: 150,
        width: 150,
        borderRadius: 75,
        marginBottom: SIZES.xSmall,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        fontFamily: FONTS.BOLD,
        fontSize: SIZES.large,
        color: COLORS.black,
        marginRight: 2,
    },
    username: {
        fontFamily: FONTS.MEDIUM,
        fontSize: SIZES.medium,
        color: COLORS.grey,
        marginBottom: SIZES.xSmall / 2,
    },
    aboutTitle: {
        color: COLORS.black,
        fontFamily: FONTS.BOLD,
        fontSize: SIZES.large,
        paddingHorizontal: SIZES.small,
    },
    songsContainer: {
        flex: 1,
        paddingTop: SIZES.xSmall / 2,
    },
});

export default ArtistScreen;
