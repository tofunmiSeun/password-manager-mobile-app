import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import {formatAvatarText} from '../Utils';

export default function ListItem({record, navigation}) {

    const viewDetails = () => {
        navigation.navigate('Details', {
            record: record
        });
    }

    return (
        <TouchableOpacity onPress={viewDetails} style={styles.parent}>
            <UserAvatar size={35} name={formatAvatarText(record.name)} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{record.name}</Text>
                <Text style={styles.username}>{record.username}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    parent: {
        padding: 12,
        flex: 1,
        flexDirection: 'row'
    },
    textContainer: {
        marginLeft: 8,
        marginVertical: 'auto'
    },
    name: {
        fontSize: 16,
        marginBottom: 3
    },
    username: {
        color: 'gray', 
        fontSize: 10
    },
    category: {
        borderColor: '#a7a7a7',
        borderWidth: 1,
        marginVertical: 'auto',
        marginLeft: 'auto',
        marginRight: 4,
        padding: 3,
        borderRadius: 2,
        fontSize: 10,
        color: '#a7a7a7'
    }
});