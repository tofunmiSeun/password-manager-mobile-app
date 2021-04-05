import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ModalTemplate from '../templates/ModalTemplate';

export default function DeleteItemConfirmationModal({ modalVisible, onOkayClicked, onCancelClicked }) {

    return <ModalTemplate modalVisible={modalVisible} onModalDismissed={onCancelClicked} modalContent={
        <View>
            <Text>Are you sure?</Text>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity onPress={onOkayClicked}>
                    <Text>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onCancelClicked}>
                    <Text>No</Text>
                </TouchableOpacity>
            </View>
        </View>}>
    </ModalTemplate>;
}

const styles = StyleSheet.create({
    emptyListContainer: {
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gainsboro'
    },
    emptyListText: {
        fontSize: 16,
        color: '#01010273',
        marginBottom: 4,
    }
});