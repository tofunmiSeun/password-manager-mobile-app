import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { Entypo } from '@expo/vector-icons';
import {SERVER_URL, formatAvatarText} from '../Utils';

export default function VaultRecordDetails({route}) {
    const {record} = route.params;
    const [reveal, setReveal] = useState('');

    const revealNow = () => {
        if (reveal === '') {
            fetch(SERVER_URL + `/reveal-password/${record.id}`)
            .then(response => response.json())
            .then(responseJson => {
                setReveal(responseJson)
                setTimeout(() => {
                    setReveal('')
                }, 5000);
            });
        } else {
            setReveal('')
        }
        
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.avatarWrapper}>
                <UserAvatar size={100} name={formatAvatarText(record.name)} />
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
                    {reveal.length === 0 && <Entypo name="eye" size={30} color="white" />}
                    {reveal.length > 0 && <Text style={styles.buttonText}>{reveal}</Text>}
                </TouchableOpacity>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    avatarWrapper: {
        marginTop: 16,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 100
    },
    recordName: {
        fontSize: 16, 
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 'bold',
        marginTop: 16
    },
    extraDetails: {
        marginTop: 40,
        padding: 12
    },
    extraDetailsRow: {
        flexDirection: 'row',
        marginBottom: 16
    },
    extraDetailsText: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 12,
        fontSize: 16
    },
    button: {
        marginTop: 40,
        backgroundColor: '#1f5ebd',
        alignItems: 'center',
        padding: 4,
        borderRadius: 4,
        minHeight: 42
    },
    buttonText: {
        color: 'white', 
        fontWeight: 'bold',
        marginTop: 'auto',
        marginBottom: 'auto',
    }
});