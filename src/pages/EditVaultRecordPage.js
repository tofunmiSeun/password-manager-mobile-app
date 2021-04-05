import * as React from 'react';
import SubmitVaultRecordTemplate from '../components/templates/SubmitVaultRecordTemplate';
import VaultService from '../services/VaultService';
import DeviceService from '../services/DeviceService';
import MasterPasswordContext from '../context/MasterPasswordContext';

export default function EditVaultRecordPage({ route, navigation }) {
    const { vaultRecord } = route?.params;
    const masterPassword = React.useContext(MasterPasswordContext);

    const [isSubmitting, setSubmitting] = React.useState(false);

    const editVaultRecord = async (recordToEdit) => {
        setSubmitting(true);

        const deviceDetails = await DeviceService.getDeviceDetails();
        const deviceId = deviceDetails.deviceId;

        VaultService.getVaultKey(recordToEdit.vaultId, deviceId, async (vaultKeyResponse) => {
            const decryptedVaultKey = await VaultService.decryptVaultKey(masterPassword, deviceDetails, vaultKeyResponse.encryptedVaultKey);
            const cipherRecord = VaultService.encryptVaultRecord(decryptedVaultKey, recordToEdit);
            VaultService.editVaultRecord(recordToEdit.id, cipherRecord, () => {
                navigation.replace('VaultDetails', { vault: { id: recordToEdit.vaultId, name: recordToEdit.vaultName } },);
                setSubmitting(false);
            }, onSubmissionFailed);

        }, onSubmissionFailed);
    };

    const onSubmissionFailed = (errorMessage) => {
        setSubmitting(false);
    }

    return <SubmitVaultRecordTemplate vaultRecord={vaultRecord}
        onSubmitRecordClicked={editVaultRecord}
        isSubmitting={isSubmitting} />
}
