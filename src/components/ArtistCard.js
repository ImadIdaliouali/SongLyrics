import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS, FONTS } from '../constants';

const ArtistCard = ({ name, image }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.5}
            onPress={() => { }}
        >
            <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.name} numberOfLines={2}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 120,
        width: 80,
        borderRadius: 10,
    },
    name: {
        width: 80,
        color: COLORS.black,
        fontFamily: FONTS.BOLD,
        fontSize: 12,
        textAlign: "center",
    },
});

export default ArtistCard;
