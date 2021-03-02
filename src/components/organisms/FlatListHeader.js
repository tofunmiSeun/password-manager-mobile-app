import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function FlatListHeader({ title }) {

    return <View style={styles.parent}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity>

        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    parent: {
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey'
    },
    title: {
        fontWeight: '500'
    },
});