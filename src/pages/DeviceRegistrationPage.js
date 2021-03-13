import * as React from 'react';
import { View } from 'react-native';
import DeviceService from '../services/DeviceService';
import DeviceCredentialsService from '../services/DeviceCredentialsService';
import TextBox from '../components/atoms/TextBox';
import PasswordBox from '../components/atoms/PasswordBox';
import AppButton from '../components/atoms/AppButton';
import OnboardingTempate from '../components/templates/OnboardingTemplate';

export default function DeviceRegistrationPage({ navigation }) {
    const [deviceName, setDeviceName] = React.useState('');
    const [masterPassword, setMasterPassword] = React.useState('');
    const [loadingData, setLoadingData] = React.useState(false);

    const recoverDevice = () => {
        navigation.replace('RecoverDevice');
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
            masterPassword.trim().length < 8;
    };

    const onRegisterDeviceButtonClicked = async () => {
        setLoadingData(true);
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
            setLoadingData(false);
            alert(generatedKeyDetails.secretKey);
            navigation.replace('Home', { masterPassword });
        }, (errorMessage) => {
            setLoadingData(false);
            console.log(errorMessage);
        })
    };

    return <OnboardingTempate title={'Register Device'}
        form={DeviceForm}
        alternateActions={[{ title: 'Recover device', action: recoverDevice }]}
        submitButton={<AppButton text='Register'
            isLoading={loadingData}
            isDisabled={isSubmitButtonDisabled()}
            onClicked={onRegisterDeviceButtonClicked} />}
    />;
}