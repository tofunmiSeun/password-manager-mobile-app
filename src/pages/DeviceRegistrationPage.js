import * as React from 'react';
import { View } from 'react-native';
import DeviceService from '../services/DeviceService';
import DeviceCredentialsService from '../services/DeviceCredentialsService';
import TextBox from '../components/atoms/TextBox';
import PasswordBox from '../components/atoms/PasswordBox';
import Button from '../components/atoms/Button';
import OnboardingTempate from '../components/templates/OnboardingTemplate';

export default function DeviceRegistrationPage({ navigation }) {
    const [deviceName, setDeviceName] = React.useState('');
    const [masterPassword, setMasterPassword] = React.useState('');

    const recoverDevice = () => {
        navigation.navigate('RecoverDevice');
    };

    const DeviceForm = <View>
        <TextBox initialTextValue={deviceName} onTextChangedCallBack={setDeviceName}
            placeholder='Device name'
            isTextInputValid={deviceName.length > 0}
            invalidTextInputErrorMessage='Name not valid' />
        <PasswordBox onPasswordChangedCallBack={setMasterPassword} placeholder='Master password' />
    </View>

    const isSubmitButtonDisabled = () => {
        return !Boolean(deviceName.trim()) ||
            !Boolean(masterPassword.trim());
    };

    const onRegisterDeviceButtonClicked = async () => {
        const generatedKeyDetails = await DeviceCredentialsService.generateAndSaveKeys(masterPassword);
        const requestBody = {
            alias: deviceName,
            publicKey: generatedKeyDetails.publicKey,
            encryptedPrivateKey: generatedKeyDetails.encryptedPrivateKey,
            mukSalt: generatedKeyDetails.mukSalt
        };
        DeviceService.uploadDeviceCredentials(requestBody, async (deviceId) => {
            generatedKeyDetails.deviceName = deviceName;
            generatedKeyDetails.deviceId = deviceId;
            await DeviceService.saveDeviceRegistrationCredentials(generatedKeyDetails);
            alert(generatedKeyDetails.secretKey);
            setMasterPassword('');
            navigation.navigate('Home');
        }, (errorMessage) => {
            console.log(errorMessage);
        })
    };

    return <OnboardingTempate title={'Register Device'}
        form={DeviceForm}
        alternateAction={{ title: 'Recover device', action: recoverDevice }}
        submitButton={<Button text='Register'
            isDisabled={isSubmitButtonDisabled()}
            onClicked={onRegisterDeviceButtonClicked} />}
    />;
}