import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Modal, View } from 'react-native';
import { APP_PRIMARY_COLOR } from '../../Utils';
import ListItemSeparator from '../atoms/ListItemSeparator';

export default function MobileModalTemplate({ modalVisible, modalContent, onModalDismissed }) {
    return <Modal animationType="slide" transparent={true}
        visible={modalVisible} onRequestClose={onModalDismissed}
        onDismiss={onModalDismissed}>
        <View style={styles.modalBase}>
            <View style={styles.modal}>
                {modalContent}
                <ListItemSeparator />
                <TouchableOpacity onPress={onModalDismissed} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>;
}

const styles = StyleSheet.create({
    modalBase: {
        flex: 1,
        margin: 'auto',
        alignContent: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 4,
        marginBottom: 4,
    },
    closeButton: {
        padding: 16,
        backgroundColor: APP_PRIMARY_COLOR,
        opacity: 0.7,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    }
});