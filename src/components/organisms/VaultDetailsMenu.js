import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, Overlay, Divider } from 'react-native-elements';
import Modal from 'modal-react-native-web';
import { useNavigation } from '@react-navigation/native';


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

    return <View style={styles.container}>{isVisible &&
        <Overlay ModalComponent={Modal} isVisible={isVisible} onBackdropPress={onMenuClosed}
            style={{ padding: 0, margin: 0 }}>
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
        </Overlay>}
    </View>;
}

const styles = StyleSheet.create({
    container: {

    }
});