import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MasterPasswordContext from '../context/MasterPasswordContext';
import VaultPage from './VaultPage';
import AddVaultButton from '../components/molecules/AddVaultButton';
import AddVaultPage from './AddVaultPage';
import VaultRecordPage from './VaultRecordPage';
import EditVaultPage from './EditVaultPage';
import VaultRecordMenuButton from '../components/molecules/VaultRecordMenuButton';
import AddVaultRecordPage from './AddVaultRecordPage';
import VaultRecordDetailsPage from './VaultRecordDetailsPage';
import EditVaultRecordButton from '../components/molecules/EditVaultRecordButton';
import EditVaultRecordPage from './EditVaultRecordPage';

const HomeStack = createStackNavigator();

export default function HomePage({ route }) {
    const masterPassword = route.params?.masterPassword;

    return <MasterPasswordContext.Provider value={masterPassword}>
        <HomeStack.Navigator initialRouteName='Vaults'>
            <HomeStack.Screen name={'Vaults'} component={VaultPage}
                options={{ headerRight: () => <AddVaultButton /> }} />
            <HomeStack.Screen name={'NewVault'} component={AddVaultPage}
                options={{ title: 'Add Vault' }} />
            <HomeStack.Screen name={'VaultRecords'} component={VaultRecordPage}
                options={({ route }) => ({
                    title: route.params.vault.name,
                    headerRight: () => <VaultRecordMenuButton vault={route.params.vault} />
                })} />
            <HomeStack.Screen name={'EditVault'} component={EditVaultPage}
                options={({ route }) => ({
                    title: route.params.vault.name,
                })} />
            <HomeStack.Screen name={'NewVaultRecord'} component={AddVaultRecordPage}
                options={({ route }) => ({
                    title: `Add to ${route.params.vault.name}`,
                })} />
            <HomeStack.Screen name={'VaultRecordDetails'} component={VaultRecordDetailsPage}
                options={({ route }) => ({
                    title: route.params.vaultRecord.name,
                    headerRight: () => <EditVaultRecordButton vaultParams={route.params} />
                })} />
            <HomeStack.Screen name={'EditVaultRecord'} component={EditVaultRecordPage}
                options={({ route }) => ({
                    title: route.params.vaultRecord.name,
                })} />
        </HomeStack.Navigator>
    </MasterPasswordContext.Provider>;

}