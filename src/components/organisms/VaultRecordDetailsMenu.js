import React from 'react';
import { View } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import VaultService from '../../services/VaultService';
import ModalTemplate from '../templates/ModalTemplate';
import DeleteItemConfirmationModal from './DeleteItemConfirmationModal';


export default function VaultRecordDetailsMenu({ navigation, isVisible, record, onMenuClosed = () => { } }) {
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [deleteRecordErrorMessage, setDeleteRecordErrorMessage] = React.useState('');

    const goToEditPage = () => {
        navigation.push('EditVaultRecord', { vaultRecord: record });
        onMenuClosed();
    }

    const showDeleteRecordModal = () => {
        onMenuClosed();
        setShowDeleteModal(true);
    }

    const deleteVaultRecord = () => {
        VaultService.deleteVaultRecord(record.id, () => {
            setShowDeleteModal(false);
            navigation.goBack();
        }, (errorMessage) => {
            setShowDeleteModal(false);
            setDeleteRecordErrorMessage(errorMessage);
        });
    }

    return <>
        <ModalTemplate modalVisible={isVisible} onModalDismissed={onMenuClosed} modalContent={
            <View style={{ borderRadius: 30 }}>
                <ListItem onPress={goToEditPage}>
                    <ListItem.Content>
                        <ListItem.Title>Edit</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <Divider />
                <ListItem onPress={showDeleteRecordModal}>
                    <ListItem.Content>
                        <ListItem.Title style={{ color: 'red' }}>Delete</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </View>}>
        </ModalTemplate>
        <DeleteItemConfirmationModal modalVisible={showDeleteModal}
            onCancelClicked={() => setShowDeleteModal(false)}
            onOkayClicked={deleteVaultRecord} />
    </>
}