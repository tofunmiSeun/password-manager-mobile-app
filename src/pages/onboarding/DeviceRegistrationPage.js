import * as React from 'react';
import { View } from 'react-native';
import DeviceService from '../../services/DeviceService';
import DeviceCredentialsService from '../../services/DeviceCredentialsService';
import UserService from '../../services/UserService';
import TextBox from '../../components/atoms/TextBox';
import PasswordBox from '../../components/atoms/PasswordBox';
import AppButton from '../../components/atoms/AppButton';
import OnboardingTempate from '../../components/templates/OnboardingTemplate';
import SecretKeyGeneratedModal from '../../components/organisms/SecretKeyGeneratedModal';

export default function DeviceRegistrationPage({ navigation }) {
    const [deviceName, setDeviceName] = React.useState('');
    const [masterPassword, setMasterPassword] = React.useState('');
    const [loadingData, setLoadingData] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [showSecretKeyModal, setShowSecretKeyModal] = React.useState(false);
    const [secretKey, setSecretKey] = React.useState('');

    const recoverDevice = () => {
        navigation.replace('RecoverDevice');
    };

    const logout = () => {
        UserService.logout();
        navigation.replace('Login');
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
        setErrorMessage('');
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
            setSecretKey(generatedKeyDetails.secretKey);
            setShowSecretKeyModal(true);
        }, (error) => {
            setLoadingData(false);
            setErrorMessage(error);
        })
    };

    const proceedToHomePage = () => {
        setShowSecretKeyModal(false);
        navigation.replace('Home', { masterPassword });
    }

    return <>
        <OnboardingTempate title={'Register Device'}
            form={DeviceForm}
            alternateActions={[{ title: 'Recover device', action: recoverDevice }, { title: 'Logout', action: logout }]}
            errorMessage={errorMessage}
            onErrorAlertClosed={() => setErrorMessage('')}
            submitButton={<AppButton text='Register'
                isLoading={loadingData}
                isDisabled={isSubmitButtonDisabled()}
                onClicked={onRegisterDeviceButtonClicked} />}
        />;
        <SecretKeyGeneratedModal isVisible={showSecretKeyModal}
            secretKey={secretKey}
            onModalClosed={() => setShowSecretKeyModal(false)}
            onProceed={proceedToHomePage} />
    </>
}