import React from 'react';
import { View } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import VaultService from '../../services/VaultService';
import ModalTemplate from '../templates/ModalTemplate';


export default function VaultRecordDetailsMenu({ navigation, isVisible, record, onMenuClosed = () => { } }) {
    const goToEditPage = () => {
        navigation.push('EditVaultRecord', { vaultRecord: record });
        onMenuClosed();
    }

    const deleteVaultRecord = () => {
        VaultService.deleteVaultRecord(record.id, () => {
            navigation.goBack();
        }, (errorMessage) => console.log(errorMessage));
    }

    return <ModalTemplate modalVisible={isVisible} onModalDismissed={onMenuClosed} modalContent={
        <View style={{ borderRadius: 30 }}>
            <ListItem onPress={goToEditPage}>
                <ListItem.Content>
                    <ListItem.Title>Edit</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <Divider />
            <ListItem onPress={deleteVaultRecord}>
                <ListItem.Content>
                    <ListItem.Title style={{ color: 'red' }}>Delete</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </View>}>
    </ModalTemplate>;
}