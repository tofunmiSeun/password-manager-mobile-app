import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { Entypo } from '@expo/vector-icons';
import {SERVER_URL, formatAvatarText} from '../Utils';

export default function CredentialsList({route}) {
    const {record} = route.params;
    const [reveal, setReveal] = useState('');

    const revealNow = () => {
        fetch(SERVER_URL + `/reveal-password/${record.id}`)
        .then(response => response.json())
        .then(responseJson => setReveal(responseJson));
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.avatarWrapper}>
                <UserAvatar size={60} name={formatAvatarText(record.name)} />
            </View>
            <Text style={styles.recordName}>{`${record.name}`}</Text> 
           <View style={styles.extraDetails}>
               <View style={styles.extraDetailsRow}>
                    <Entypo name="user" size={35} color="grey" />
                    <Text style={styles.extraDetailsText}>{`${record.username}`}</Text> 
               </View>
               <View style={styles.extraDetailsRow}>
                    <Entypo name="link" size={32} color="grey" />
                    <Text style={styles.extraDetailsText}>{`${record.url}`}</Text> 
               </View>
               <TouchableOpacity style={styles.button} onPress={revealNow}>
                    <Entypo name="eye" size={30} color="white" />
                </TouchableOpacity>
                <Text>{reveal}</Text>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    avatarWrapper: {
        marginTop: 16,
        marginHorizontal: 'auto',
        width: 60
    },
    recordName: {
        fontSize: 16, 
        marginHorizontal: 'auto', 
        fontWeight: 'bold',
        marginTop: 8
    },
    extraDetails: {
        marginTop: 20,
        padding: 12
    },
    extraDetailsRow: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10
    },
    extraDetailsText: {
        marginVertical: 'auto',
        marginLeft: 12,
        fontSize: 16
    },
    button: {
        marginTop: 20,
        backgroundColor: '#1f5ebd',
        alignItems: 'center',
        padding: 4,
        borderRadius: 4
    },
    buttonText: {
        color: 'white', 
        fontWeight: 'bold'
    }
});