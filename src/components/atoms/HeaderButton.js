import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';


export default function HeaderButton({ iconView, onButtonClicked = () => { } }) {
    return (
        <TouchableOpacity style={styles.parent} onPress={onButtonClicked}>
            {iconView}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    parent: {
        marginRight: 16,
        marginLeft: 16
    }
});
