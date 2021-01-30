import * as React from 'react';
import { View } from 'react-native';
import { } from '../services/DeviceRegistrationService';
import PasswordBox from '../components/atoms/PasswordBox';
import Button from '../components/atoms/Button';

export default function DeviceRegistrationPage({ navigation }) {
    const [masterPassword, setMasterPassword] = React.useState('');

    const onRegisterDeviceButtonClicked = () => {

    };

    return (
        <View style={{ flex: 1 }}>
            <PasswordBox onPasswordChangedCallBack={setMasterPassword} />
            <Button text='Login' isDisabled={false} onClicked={onRegisterDeviceButtonClicked} />
        </View>
    )
}