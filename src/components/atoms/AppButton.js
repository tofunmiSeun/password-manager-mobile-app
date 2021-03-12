import * as React from 'react';
import { TouchableOpacity, Text, Button } from 'react-native';
import AtomsStyles from './AtomsStyles';
import { APP_PRIMARY_COLOR } from '../../Utils';


export default function AppButton({ text = '', onClicked = () => { return; }, isDisabled = false }) {
    return (
        <Button style={AtomsStyles.button}
            color={APP_PRIMARY_COLOR}
            onPress={onClicked}
            disabled={isDisabled}
            title={text} />
    );
}