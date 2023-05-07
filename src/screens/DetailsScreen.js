import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as cheerio from 'cheerio';

import { COLORS, FONTS, SIZES } from '../constants';
import { getSongById, getSongLyrics } from '../services';
import { ArtistCard, ItemSeparator } from '../components';

const { width, height } = Dimensions.get("screen");

const setHight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const DetailsScreen = ({ navigation, route }) => {
    const { songId } = route.params;

    const [song, setSong] = useState(null);
    const [url, setUrl] = useState(null);
    const [lyrics, setLyrics] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFeaturingSelected, setIsFeaturingSelected] = useState(true);

    useEffect(() => {
        getSongById(songId)
            .then(response => {
                setSong(response.data.response.song);
                setUrl(response.data.response.song.url);
            })
            .catch(error => alert(error));
    }, []);

    useEffect(() => {
        if (url) {
            setIsLoading(true);
            getSongLyrics(url)
                .then(response => {
                    const $ = cheerio.load(response.data);
                    let lyr = $("div[class*='Lyrics__Container']")
                        .toArray()
                        .map((x) => {
                            const ele = $(x);
                            ele.find("br").replaceWith("\n");
                            return ele.text();
                        })
                        .join("\n")
                        .trim();
                    setLyrics(lyr);
                })
                .catch(error => alert(error))
                .finally(() => setIsLoading(false));
        }
    }, [url]);

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.songArtContainer}>
                <Image
                    source={{ uri: song?.song_art_image_url }}
                    style={styles.songArtImage}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.headerContainer}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
                    <Feather
                        name="chevron-left"
                        size={35}
                        color={COLORS.lightWhite}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.playButton}
                activeOpacity={0.5}
                onPress={() => Linking.openURL(song?.media[0]?.url)}
            >
                <Ionicons
                    name="play-circle-outline"
                    size={70}
                    color={COLORS.white}
                />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText} numberOfLines={2}>{song?.title} - {song?.artist_names} </Text>
                <View style={styles.row}>
                    <Feather
                        name="calendar"
                        size={22}
                        color={COLORS.primary}
                    />
                    <Text style={styles.dateText}>{song?.release_date_with_abbreviated_month_for_display}</Text>
                </View>
            </View>
            <Text style={styles.albumText}>{song?.album?.name}</Text>
            <Text style={styles.albumText}>{song?.language}</Text>
            <View style={styles.lyricsContainer}>
                <Text style={styles.lyricsTitle}>Lyrics</Text>
                {isLoading
                    ? (
                        <View style={styles.activityIndicator}>
                            <ActivityIndicator size="large" color={COLORS.green} />
                        </View>
                    )
                    : <Text style={styles.lyricsText}>{lyrics}</Text>}
            </View>
            <View>
                <Text style={styles.aboutTitle}>About</Text>
                <View style={styles.aboutSubMenuContainer}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => setIsFeaturingSelected(true)}>
                        <Text
                            style={{
                                ...styles.aboutSubMenuText,
                                color: isFeaturingSelected ? COLORS.black : COLORS.lightGrey,
                            }}
                        >
                            Featuring
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => setIsFeaturingSelected(false)}>
                        <Text
                            style={{
                                ...styles.aboutSubMenuText,
                                color: isFeaturingSelected ? COLORS.lightGrey : COLORS.black,
                            }}
                        >
                            Producers
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{ marginVertical: 5 }}
                    data={isFeaturingSelected ? [song?.primary_artist].concat(song?.featured_artists) : song?.producer_artists}
                    keyExtractor={(item, index) => index}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <ItemSeparator width={20} />}
                    ListHeaderComponent={() => <ItemSeparator width={20} />}
                    ListFooterComponent={() => <ItemSeparator width={20} />}
                    renderItem={({ item }) => <ArtistCard
                        name={item?.name}
                        image={item?.image_url}
                        onPress={() => navigation.navigate("artist", { artistId: item.id })}
                    />}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    },
    songArtContainer: {
        height: setHight(35),
        width: setWidth(145),
        alignItems: "center",
        top: 0,
        left: setWidth((100 - 145) / 2),
        borderBottomRightRadius: 300,
        borderBottomLeftRadius: 300,
        elevation: 8,
    },
    songArtImage: {
        height: setHight(35),
        width: setWidth(145),
        borderBottomRightRadius: 300,
        borderBottomLeftRadius: 300,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        position: "absolute",
        top: 20,
        elevation: 20,
    },
    playButton: {
        position: "absolute",
        top: 100,
        left: setWidth(50) - 70 / 2,
        elevation: 10,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 10,
    },
    titleText: {
        width: setWidth(60),
        fontFamily: FONTS.BOLD,
        fontSize: 18,
        color: COLORS.black,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    dateText: {
        marginLeft: 5,
        fontFamily: FONTS.BOLD,
        fontSize: 15,
        color: COLORS.black,
    },
    albumText: {
        color: COLORS.lightGrey,
        paddingHorizontal: 20,
        paddingTop: 5,
        fontFamily: FONTS.BOLD,
    },
    lyricsContainer: {
        backgroundColor: COLORS.extraLightGrey,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
    },
    lyricsTitle: {
        fontFamily: FONTS.BOLD,
        fontSize: 18,
        color: COLORS.black,
    },
    activityIndicator: {
        paddingVertical: SIZES.xSmall,
    },
    lyricsText: {
        paddingVertical: 5,
        fontFamily: FONTS.BOLD,
        fontSize: 14,
        color: COLORS.lightGrey,
        textAlign: "justify",
    },
    aboutTitle: {
        marginLeft: 20,
        color: COLORS.black,
        fontFamily: FONTS.BOLD,
        fontSize: 18,
    },
    aboutSubMenuContainer: {
        marginLeft: 20,
        flexDirection: "row",
        marginVertical: 5,
    },
    aboutSubMenuText: {
        marginRight: 10,
        color: COLORS.black,
        fontFamily: FONTS.BOLD,
        fontSize: 13,
    },
});

export default DetailsScreen;
