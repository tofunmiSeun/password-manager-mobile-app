import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import AtomsStyles from './AtomsStyles';


export default function Button({ text = '', onClicked = () => { return; }, isDisabled = false }) {
    return (
        <TouchableOpacity style={AtomsStyles.button} onPress={onClicked} disabled={isDisabled}>
            <Text style={AtomsStyles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}