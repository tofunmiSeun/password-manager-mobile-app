import * as React from 'react';
import SubmitVaultRecordTemplate from '../../components/templates/SubmitVaultRecordTemplate';
import VaultService from '../../services/VaultService';
import DeviceService from '../../services/DeviceService';
import MasterPasswordContext from '../../context/MasterPasswordContext';

export default function AddVaultRecordPage({ route, navigation }) {
    const { vault } = route?.params;
    const emptyVaultRecord = { name: '', url: '', username: '', password: '' };
    const masterPassword = React.useContext(MasterPasswordContext);

    const [isSubmitting, setSubmitting] = React.useState(false);

    const newVaultRecord = async (vaultRecord) => {
        setSubmitting(true);

        const deviceDetails = await DeviceService.getDeviceDetails();
        const deviceId = deviceDetails.deviceId;

        VaultService.getVaultKey(vault.id, deviceId, async (vaultKeyResponse) => {
            const decryptedVaultKey = await VaultService.decryptVaultKey(masterPassword, deviceDetails, vaultKeyResponse.encryptedVaultKey);
            const cipherRecord = VaultService.encryptVaultRecord(decryptedVaultKey, vaultRecord);
            VaultService.createVaultRecord(vault.id, cipherRecord, (vaultRecordId) => {
                navigation.replace('VaultDetails', { vault });
                setSubmitting(false);
            }, onSubmissionFailed);

        }, onSubmissionFailed);
    };

    const onSubmissionFailed = (errorMessage) => {
        setSubmitting(false);
    }

    return <SubmitVaultRecordTemplate vaultRecord={emptyVaultRecord}
        onSubmitRecordClicked={newVaultRecord}
        isSubmitting={isSubmitting} />
}
