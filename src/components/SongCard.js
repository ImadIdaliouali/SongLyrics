import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import { COLORS, FONTS, SIZES } from '../constants';

const SongCard = ({ title, artist, albumArt, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.5}
            onPress={() => onPress()}
        >
            <Image source={{ uri: albumArt }} style={styles.albumArt} />
            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.artist} numberOfLines={1}>{artist}</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => onPress()}
            >
                <Entypo
                    name="chevron-right"
                    size={24}
                    color={COLORS.white}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center",
        borderRadius: SIZES.xSmall,
        margin: SIZES.xSmall,
        elevation: 5,
    },
    albumArt: {
        width: 80,
        height: 80,
        borderTopLeftRadius: SIZES.xSmall,
        borderBottomLeftRadius: SIZES.xSmall,
        marginRight: SIZES.xSmall,
    },
    details: {
        flex: 1,
    },
    title: {
        fontFamily: FONTS.BOLD,
        fontSize: SIZES.medium,
        color: COLORS.black,
        marginBottom: 5,
    },
    artist: {
        fontFamily: FONTS.REGULAR,
        fontSize: 14,
        color: COLORS.grey,
    },
    button: {
        height: 45,
        width: 45,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.xSmall,
        marginRight: SIZES.xSmall,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
    },
});

export default SongCard;
