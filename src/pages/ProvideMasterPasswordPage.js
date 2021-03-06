import * as React from 'react';
import DeviceService from '../services/DeviceService';
import DeviceCredentialsService from '../services/DeviceCredentialsService';
import UserService from '../services/UserService';
import PasswordBox from '../components/atoms/PasswordBox';
import AppButton from '../components/atoms/AppButton';
import OnboardingTempate from '../components/templates/OnboardingTemplate';

export default function ProvideMasterPasswordPage({ navigation }) {
    const [masterPassword, setMasterPassword] = React.useState('');

    const logout = () => {
        UserService.logout();
        navigation.replace('Login');
    };

    const isSubmitButtonDisabled = () => {
        return masterPassword.trim().length < 8;
    };

    const onValidateMasterPasswordButtonClicked = async () => {
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
        }
    };

    const onMasterPasswordValidationFailed = () => {
        console.log("Failed to validate master password");
    }

    return <OnboardingTempate title={'Access Vaults'}
        form={<PasswordBox onPasswordChangedCallBack={setMasterPassword} placeholder='Master password' />}
        alternateActions={[{ title: 'Logout', action: logout }]}
        submitButton={<AppButton text='Continue'
            isDisabled={isSubmitButtonDisabled()}
            onClicked={onValidateMasterPasswordButtonClicked} />}
    />;
}