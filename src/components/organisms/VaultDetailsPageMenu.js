import React from 'react';
import { View } from 'react-native';
import AddVaultRecordButton from '../molecules/AddVaultRecordButton';
import EditVaultButton from '../molecules/EditVaultButton';

export default function VaultDetailsPageMenu({ route }) {
    return <View style={{ display: 'flex', flexDirection: 'row' }}>
        <AddVaultRecordButton vaultParams={route.params} />
        <EditVaultButton vaultParams={route.params} />
    </View>
};
