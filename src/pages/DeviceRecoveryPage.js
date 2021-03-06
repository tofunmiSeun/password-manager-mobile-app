import * as React from 'react';
import { View } from 'react-native';
import DeviceService from '../services/DeviceService';
import DeviceCredentialsService from '../services/DeviceCredentialsService';
import UserService from '../services/UserService';
import SelectBox from '../components/atoms/SelectBox';
import PasswordBox from '../components/atoms/PasswordBox';
import AppButton from '../components/atoms/AppButton';
import OnboardingTempate from '../components/templates/OnboardingTemplate';

export default function DeviceRecoveryPage({ navigation }) {
    const [devices, setDevices] = React.useState([]);
    const [selectedDevice, setSelectedDevice] = React.useState();
    const [secretKey, setSecretKey] = React.useState('');
    const [masterPassword, setMasterPassword] = React.useState('');

    React.useEffect(() => {
        DeviceService.getAllDevices((response) => {
            setDevices(response);
            if (response.length === 0) {
                navigation.replace('RegisterDevice');
            }
        }, (errorMessage) => {
            console.log(errorMessage);
        })
    }, []);

    const deviceObjectSelectBoxFormatter = (d) => {
        return { value: d.id, label: d.alias };
    };

    const onDeviceSelected = (deviceId) => {
        const selection = devices.find(dev => dev.id === deviceId);
        setSelectedDevice(selection);
    };

    const logout = () => {
        UserService.logout();
        navigation.replace('Login');
    };

    const registerNewDevice = () => {
        navigation.replace('RegisterDevice');
    };

    const DeviceForm = <View>
        {devices.length > 0 && <SelectBox initialSelection={devices[0].id}
            options={devices} viewModelFormatter={deviceObjectSelectBoxFormatter}
            onSelectionChangedCallBack={onDeviceSelected} />}
        <PasswordBox onPasswordChangedCallBack={setSecretKey} placeholder='Secret key' />
        <PasswordBox onPasswordChangedCallBack={setMasterPassword} placeholder='Master password' />
    </View>

    const isSubmitButtonDisabled = () => {
        return !Boolean(selectedDevice) ||
            !Boolean(secretKey.trim()) ||
            masterPassword.trim().length < 8;
    };

    const onRecoverDeviceButtonClicked = async () => {
        try {
            var isValid = false;
            isValid = await DeviceCredentialsService.validateDeviceCredentials(selectedDevice, masterPassword, secretKey);
            if (isValid) {
                await DeviceService.saveDeviceRegistrationCredentials({
                    deviceName: selectedDevice.alias,
                    deviceId: selectedDevice.id,
                    publicKey: selectedDevice.publicKey,
                    encryptedPrivateKey: selectedDevice.encryptedPrivateKey,
                    mukSalt: selectedDevice.mukSalt,
                    secretKey: secretKey
                });
                navigation.replace('Home', { masterPassword });
            } else {
                onDeviceRecoveryFailed();
            }
        } catch (error) {
            console.log(error);
            onDeviceRecoveryFailed();
        }
    };

    const onDeviceRecoveryFailed = () => {
        console.log("Failed to recover device");
    }

    return <OnboardingTempate title={'Recover Device'}
        form={DeviceForm}
        alternateActions={[{ title: 'New device', action: registerNewDevice }, { title: 'Logout', action: logout }]}
        submitButton={<AppButton text='Register'
            isDisabled={isSubmitButtonDisabled()}
            onClicked={onRecoverDeviceButtonClicked} />}
    />;
}