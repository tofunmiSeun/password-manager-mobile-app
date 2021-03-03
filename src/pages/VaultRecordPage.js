import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import AppListView from '../components/organisms/AppListView';
import VaultService from '../services/VaultService';

export default function VaultRecordPage({ route }) {
    const { vaultId, vaultName } = route?.params;
    const [vaultRecords, setVaultRecords] = React.useState([]);
    const [loadingData, setLoadingData] = React.useState(false);
    const [searchKey, setSearchKey] = React.useState('');

    React.useEffect(() => {
        getVaultRecords();
    }, []);

    const getVaultRecords = () => {
        setLoadingData(true);
        VaultService.getVaultRecords(vaultId, (response) => {
            setVaultRecords(response);
            setLoadingData(false);
        }, (errorMessage) => {
            setLoadingData(false);
        });
    }

    const ListItem = ({ item }) => (
        <TouchableOpacity style={{ padding: 16 }}>
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <AppListView loadingData={loadingData} data={vaultRecords} listItem={ListItem}
            onListViewRefreshed={getVaultRecords}
            keyExtractorFunction={item => item.id}
            searchText={searchKey}
            onSearchTextChanged={setSearchKey} />
    );
}