import React from 'react';
import {StyleSheet, View, Text} from 'react-native';


export default function SectionedListHeader ({title}) {
    return (
        <View>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        borderWidth: 1,
        borderColor: '#CED0CE',
        fontSize: 18,
        padding: 6,
        fontWeight: 'bold',
        backgroundColor: '#d0cbcb47'
    }
});
