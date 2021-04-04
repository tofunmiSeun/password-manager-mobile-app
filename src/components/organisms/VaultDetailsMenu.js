import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import ModalTemplate from '../templates/ModalTemplate';


export default function VaultDetailsMenu({ isVisible, vault, onMenuClosed = () => { } }) {
    const navigation = useNavigation();

    const goToAddRecordPage = () => {
        navigation.navigate('NewVaultRecord', { vault });
        onMenuClosed();
    }

    const goToEditPage = () => {
        navigation.push('EditVault', { vault });
        onMenuClosed();
    }

    const deleteVaultPage = () => {

    }

    return <ModalTemplate modalVisible={isVisible} onModalDismissed={onMenuClosed} modalContent={
        <View style={{ borderRadius: 30 }}>
            <ListItem onPress={goToAddRecordPage}>
                <ListItem.Content>
                    <ListItem.Title>Add record</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <Divider />
            <ListItem onPress={goToEditPage}>
                <ListItem.Content>
                    <ListItem.Title>Edit</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <Divider />
            <ListItem onPress={deleteVaultPage}>
                <ListItem.Content>
                    <ListItem.Title style={{ color: 'red' }}>Delete</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </View>}>
    </ModalTemplate>;
}