import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import AppListView from '../components/organisms/AppListView';
import VaultService from '../services/VaultService';
import DeviceService from '../services/DeviceService';

export default function VaultPage({ navigation }) {
    const [vaults, setVaults] = React.useState([]);
    const [loadingData, setLoadingData] = React.useState(false);
    const [searchKey, setSearchKey] = React.useState('');

    React.useEffect(() => {
        getVaults();
    }, []);

    const getVaults = async () => {
        const deviceId = await DeviceService.getDeviceId();
        setLoadingData(true);
        VaultService.getVaults(deviceId, (response) => {
            setVaults(response);
            setLoadingData(false);
        }, (errorMessage) => {
            setLoadingData(false);
        });
    }

    const ListItem = ({ item }) => (
        <TouchableOpacity style={{ padding: 16, backgroundColor: '#fff' }}
            onPress={() => viewRecordsInVault(item)}>
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
        </TouchableOpacity>
    );

    const viewRecordsInVault = (vault) => {
        navigation.navigate('VaultRecords', { vaultId: vault.id, vaultName: vault.name });
    }

    return (
        <AppListView loadingData={loadingData} data={vaults} listItem={ListItem}
            onListViewRefreshed={getVaults}
            keyExtractorFunction={item => item.id}
            searchText={searchKey}
            onSearchTextChanged={setSearchKey} />
    );
}