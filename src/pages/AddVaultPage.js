import * as React from 'react';
import SubmitVaultTemplate from '../components/templates/SubmitVaultTemplate';
import VaultService from '../services/VaultService';
import DeviceService from '../services/DeviceService';
import MasterPasswordContext from '../context/MasterPasswordContext';

export default function AddVaultPage({ navigation }) {
    const masterPassword = React.useContext(MasterPasswordContext);
    const [isSubmitting, setSubmitting] = React.useState(false);

    const newVault = async (vaultName) => {
        setSubmitting(true);

        const deviceDetails = await DeviceService.getDeviceDetails();
        const deviceId = deviceDetails.deviceId;

        const encryptedVaultKey = await VaultService.generateAndEncryptVaultKey(masterPassword, deviceDetails);

        VaultService.createVault({ name: vaultName, deviceId, encryptedVaultKey }, (vaultId) => {
            navigation.replace('VaultDetails', { vault: { id: vaultId, name: vaultName } });
            setSubmitting(false);
        }, (errorMessage) => {
            setSubmitting(false);
            console.log(errorMessage);
        })
    };

    return <SubmitVaultTemplate vaultName='' onSubmitVaultClicked={newVault} isSubmitting={isSubmitting} />;
}
