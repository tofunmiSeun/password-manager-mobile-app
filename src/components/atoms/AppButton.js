import * as React from 'react';
import { TouchableOpacity, Text, Button } from 'react-native';
import AtomsStyles from './AtomsStyles';


export default function AppButton({ text = '', onClicked = () => { return; }, isDisabled = false }) {
    return (
        <Button style={AtomsStyles.button}
            onPress={onClicked}
            disabled={isDisabled}
            title={text} />
    );
}