import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';
import AtomsStyles from './AtomsStyles';


export default function AppButton({ text = '', onClicked = () => { return; }, isDisabled = false, isLoading = false }) {
    return (
        <Button containerStyle={{ marginTop: 40 }}
            buttonStyle={AtomsStyles.button}
            onPress={onClicked}
            disabled={isDisabled || isLoading}
            loading={isLoading}
            title={text} />
    );
}