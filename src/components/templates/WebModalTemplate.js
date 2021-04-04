import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'modal-enhanced-react-native-web';

export default function WebModalTemplate({ modalVisible, modalContent, onModalDismissed }) {

    return <Modal visible={modalVisible} onBackdropPress={onModalDismissed} style={styles.modalBase}>
        <View style={styles.modal}>
            {modalContent}
        </View>
    </Modal>;
}

const styles = StyleSheet.create({
    modalBase: {
        justifyContent: 'center',
        margin: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modal: {
        width: 'fit-content',
        margin: 'auto',
        borderRadius: 3,
        padding: 8,
        minWidth: '200px',
        backgroundColor: '#fff'
    }
});