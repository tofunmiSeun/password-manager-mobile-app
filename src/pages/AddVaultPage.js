import * as React from 'react';
import TextBox from '../components/atoms/TextBox';
import FormTempate from '../components/templates/FormTemplate';
import VaultService from '../services/VaultService';
import DeviceService from '../services/DeviceService';

export default function AddVaultPage({ navigation }) {
    const [isSubmitting, setSubmitting] = React.useState(false);
    const [vaultName, setVaultName] = React.useState('');

    const newVault = async () => {
        setSubmitting(true);

        const deviceDetails = await DeviceService.getDeviceDetails();
        const deviceId = deviceDetails.deviceId;

        const generatedVaultKey = await VaultService.generateVaultKey();

        VaultService.createVault({ name: vaultName, deviceId }, (vaultId) => {
            console.log(vaultId);
            setSubmitting(false);
        }, (errorMessage) => {
            setSubmitting(false);
            console.log(errorMessage);
        })
    };

    return (
        <FormTempate form={<TextBox initialTextValue={vaultName} onTextChangedCallBack={setVaultName}
            isTextInputValid={vaultName.length > 0} />}
            submitButtonTitle='Add'
            isSubmitButtonDisabled={vaultName.trim().length === 0}
            onSubmitButtonClicked={newVault}
            isSubmittingForm={isSubmitting} />
    );
}
