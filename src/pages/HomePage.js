import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MasterPasswordContext from '../context/MasterPasswordContext';
import VaultPage from './VaultPage';
import AddVaultButton from '../components/molecules/AddVaultButton';
import AddVaultPage from './AddVaultPage';
import VaultRecordPage from './VaultRecordPage';

const HomeStack = createStackNavigator();

export default function HomePage({ navigation }) {
    const [homeInitialRouteName, setInitialRouteName] = React.useState('Vaults');
    const [masterPassword, setMasterPassword] = React.useState('password');

    return <MasterPasswordContext.Provider value={masterPassword}>
        <HomeStack.Navigator initialRouteName={homeInitialRouteName}>
            <HomeStack.Screen name={'Vaults'} component={VaultPage}
                options={{ headerRight: () => <AddVaultButton /> }} />
            <HomeStack.Screen name={'NewVault'} component={AddVaultPage}
                options={{ title: 'Add Vault' }} />
            <HomeStack.Screen name={'VaultRecords'} component={VaultRecordPage}
                options={({ route }) => ({ title: route.params.vaultName })} />
        </HomeStack.Navigator>
    </MasterPasswordContext.Provider>;

}