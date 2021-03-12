import React from 'react';
import { View } from 'react-native';
import AddVaultRecordButton from '../molecules/AddVaultRecordButton';
import EditVaultButton from '../molecules/EditVaultButton';
import DeleteVaultButton from '../molecules/DeleteVaultButton';

export default function VaultDetailsPageMenu({ route }) {
    return <View style={{ display: 'flex', flexDirection: 'row' }}>
        <EditVaultButton vaultParams={route.params} />
        <DeleteVaultButton vaultParams={route.params} />
    </View>
};
