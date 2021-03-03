import * as React from 'react';
import TextBox from '../components/atoms/TextBox';
import PasswordBox from '../components/atoms/PasswordBox';
import FormTempate from '../components/templates/FormTemplate';
import VaultService from '../services/VaultService';
import DeviceService from '../services/DeviceService';
import MasterPasswordContext from '../context/MasterPasswordContext';

export default function AddVaultRecordPage({ route, navigation }) {
    const { vaultId, vaultName } = route?.params;
    const masterPassword = React.useContext(MasterPasswordContext);

    const [isSubmitting, setSubmitting] = React.useState(false);
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const isSubmitButtonDisabled = () => {
        return !Boolean(name.trim()) ||
            !Boolean(username.trim()) ||
            !Boolean(password.trim())
    }

    const newVaultRecord = async () => {
        setSubmitting(true);

        const deviceDetails = await DeviceService.getDeviceDetails();
        const deviceId = deviceDetails.deviceId;

        VaultService.getVaultKey(vaultId, deviceId, async (vaultKeyResponse) => {
            const decryptedVaultKey = await VaultService.decryptVaultKey(masterPassword, deviceDetails, vaultKeyResponse.encryptedVaultKey);
            const cipherRecord = VaultService.encryptVaultRecord(decryptedVaultKey, { name, url, username, password });
            VaultService.createVaultRecord(vaultId, cipherRecord, (vaultRecordId) => {
                console.log(vaultRecordId);
                navigation.navigate('Home', {
                    screen: 'VaultRecords', params: { vaultRecordId, vaultRecordName: name },
                });
                setSubmitting(false);
            }, onSubmissionFailed);

        }, onSubmissionFailed);
    };

    const onSubmissionFailed = (errorMessage) => {
        setSubmitting(false);
    }

    return (
        <FormTempate form={<>
            <TextBox initialTextValue={name} onTextChangedCallBack={setName}
                placeholder='Name'
                isTextInputValid={name.length > 0} />
            <TextBox initialTextValue={url} onTextChangedCallBack={setUrl}
                placeholder='Url'
                isTextInputValid={url.length > 0} />
            <TextBox initialTextValue={username} onTextChangedCallBack={setUsername}
                placeholder='Username'
                isTextInputValid={username.length > 0} />
            <PasswordBox onPasswordChangedCallBack={setPassword} /></>}
            submitButtonTitle='Save'
            isSubmitButtonDisabled={isSubmitButtonDisabled()}
            onSubmitButtonClicked={newVaultRecord}
            isSubmittingForm={isSubmitting} />
    );
}
