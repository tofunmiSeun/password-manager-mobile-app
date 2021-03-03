import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import VaultPage from './VaultPage';
import AddVaultButton from '../components/molecules/AddVaultButton';
import AddVaultPage from './AddVaultPage';

const HomeStack = createStackNavigator();

export default function HomePage({ navigation }) {
    const [homeInitialRouteName, setInitialRouteName] = React.useState('Vaults');

    return <HomeStack.Navigator initialRouteName={homeInitialRouteName}>
        <HomeStack.Screen name={'Vaults'} component={VaultPage}
            options={{ headerRight: () => <AddVaultButton /> }} />
        <HomeStack.Screen name={'NewVault'} component={AddVaultPage}
            options={{ title: 'Add Vault' }} />
    </HomeStack.Navigator>;
}