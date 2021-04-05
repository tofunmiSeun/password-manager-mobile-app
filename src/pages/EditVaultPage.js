import * as React from 'react';
import SubmitVaultTemplate from '../components/templates/SubmitVaultTemplate';
import VaultService from '../services/VaultService';

export default function EditVaultPage({ route, navigation }) {
    const { vault } = route.params;
    const [isSubmitting, setSubmitting] = React.useState(false);

    const editVault = async (updatedVaultName) => {
        setSubmitting(true);

        VaultService.editVault(vault.id, { name: updatedVaultName }, () => {
            navigation.replace('VaultDetails', { vault: Object.assign(vault, { name: updatedVaultName }) });
            setSubmitting(false);
        }, (errorMessage) => {
            setSubmitting(false);
            console.log(errorMessage);
        })
    };

    return <SubmitVaultTemplate vaultName={vault.name} onSubmitVaultClicked={editVault} isSubmitting={isSubmitting} />;
}
