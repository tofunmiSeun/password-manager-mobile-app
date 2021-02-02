import * as React from 'react';
import { View } from 'react-native';
import DeviceRegistrationService from '../services/DeviceRegistrationService';
import PasswordBox from '../components/atoms/PasswordBox';
import Button from '../components/atoms/Button';

export default function DeviceRegistrationPage({ navigation }) {
    const [masterPassword, setMasterPassword] = React.useState('');

    const onRegisterDeviceButtonClicked = () => {
        DeviceRegistrationService.generateKeys(masterPassword);
    };

    return (
        <View style={{ flex: 1 }}>
            <PasswordBox onPasswordChangedCallBack={setMasterPassword} placeholder='Master password' />
            <Button text='Register' isDisabled={false} onClicked={onRegisterDeviceButtonClicked} />
        </View>
    )
}