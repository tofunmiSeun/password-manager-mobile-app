import * as React from 'react';
import DeviceService from '../../services/DeviceService';
import DeviceCredentialsService from '../../services/DeviceCredentialsService';
import UserService from '../../services/UserService';
import PasswordBox from '../../components/atoms/PasswordBox';
import AppButton from '../../components/atoms/AppButton';
import OnboardingTempate from '../../components/templates/OnboardingTemplate';

export default function ProvideMasterPasswordPage({ navigation }) {
    const [isValidatingPassword, setValidatingPassword] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [masterPassword, setMasterPassword] = React.useState('');

    const logout = () => {
        UserService.logout();
        navigation.replace('Login');
    };

    const changeDevice = () => {
        navigation.navigate('RecoverDevice');
    };

    const isSubmitButtonDisabled = () => {
        return masterPassword.trim().length < 1;
    };

    const onValidateMasterPasswordButtonClicked = async () => {
        setErrorMessage('');
        setValidatingPassword(true);
        const device = await DeviceService.getDeviceDetails();
        try {
            var isValid = false;
            isValid = await DeviceCredentialsService.validateDeviceCredentials(device, masterPassword, device.secretKey);
            if (isValid) {
                navigation.replace('Home', { masterPassword });
            } else {
                onMasterPasswordValidationFailed();
            }
        } catch (error) {
            onMasterPasswordValidationFailed();
            return;
        } finally {
            setValidatingPassword(false);
        }
    };

    const onMasterPasswordValidationFailed = () => {
        setErrorMessage('master password is incorrect for this device');
    }

    return <OnboardingTempate title={'Access Vaults'}
        form={<PasswordBox onPasswordChangedCallBack={setMasterPassword} placeholder='Master password' />}
        alternateActions={[{ title: 'Logout', action: logout }, { title: 'Change Device', action: changeDevice }]}
        errorMessage={errorMessage}
        onErrorAlertClosed={() => setErrorMessage('')}
        submitButton={<AppButton text='Proceed'
            isLoading={isValidatingPassword}
            isDisabled={isSubmitButtonDisabled()}
            onClicked={onValidateMasterPasswordButtonClicked} />} />

}