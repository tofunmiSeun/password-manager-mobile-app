import * as React from 'react';
import { TextInput } from 'react-native';
import AtomsStyles from './AtomsStyles';


export default function PasswordBox({ onPasswordChangedCallBack = (newText) => { return; } }) {

    const [password, setPassword] = React.useState('');

    const onPasswordChanged = (newValue) => {
        setPassword(newValue);
        onPasswordChangedCallBack(newValue);
    }

    return (
        <TextInput style={AtomsStyles.textInput}
            placeholder='Password' value={password} secureTextEntry={true}
            onChangeText={onPasswordChanged} />
    );
}