import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AtomsStyles from '../atoms/AtomsStyles';


export default function Alert({ message = '', type = '', onClosed = () => { } }) {

    const getBgColor = () => {
        if (type === 'error') {
            return 'red';
        } else if (type === 'warning') {
            return 'yellow';
        } else if (type === 'success') {
            return 'green';
        } else {
            return 'black';
        }
    }

    return <View style={[AtomsStyles.alertBase, { backgroundColor: getBgColor() }]}>
        <Text style={AtomsStyles.alertText}>{message}</Text>
        <TouchableOpacity onPress={onClosed} style={{ marginLeft: 'auto' }}>
            <Ionicons name="close-circle" size={20} color={'white'} />
        </TouchableOpacity>
    </View>;
}