import * as React from 'react';
import { View } from 'react-native';
import DeviceRegistrationService from '../services/DeviceRegistrationService';
import UserService from '../services/UserService';
import PasswordBox from '../components/atoms/PasswordBox';
import Button from '../components/atoms/Button';
import OnboardingTempate from '../components/templates/OnboardingTemplate';

export default function DeviceRegistrationPage({ navigation }) {
    const [masterPassword, setMasterPassword] = React.useState('');

    const logout = () => {
        UserService.logout();
        navigation.navigate('Login');
    };

    const isSubmitButtonDisabled = () => {
        return !Boolean(masterPassword.trim());
    };

    const onRegisterDeviceButtonClicked = async () => {
        const generatedKeyDetails = await DeviceRegistrationService.generateAndSaveKeys(masterPassword);
        const requestBody = {
            publicKey: generatedKeyDetails.publicKey,
            encryptedPrivateKey: generatedKeyDetails.encryptedPrivateKey,
            mukSalt: generatedKeyDetails.mukSalt
        };
        DeviceRegistrationService.uploadDeviceCredentials(requestBody, async () => {
            await DeviceRegistrationService.saveDeviceRegistrationCredentials(generatedKeyDetails);
            setMasterPassword('');
            navigation.navigate('Home');
        }, (errorMessage) => {
            console.log(errorMessage);
        })
    };

    return <OnboardingTempate title={'Register Device'}
        form={<PasswordBox onPasswordChangedCallBack={setMasterPassword} placeholder='Master password' />}
        alternateAction={{ title: 'Logout', action: logout }}
        submitButton={<Button text='Register'
            isDisabled={isSubmitButtonDisabled()}
            onClicked={onRegisterDeviceButtonClicked} />}
    />;

}