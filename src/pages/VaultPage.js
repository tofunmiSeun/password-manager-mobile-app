import * as React from 'react';
import { View, Text } from 'react-native';
import AppListView from '../components/organisms/AppListView';
import VaultService from '../services/VaultService';

export default function VaultPage() {
    const [vaults, setVaults] = React.useState([]);
    const [loadingData, setLoadingData] = React.useState(false);
    const [searchKey, setSearchKey] = React.useState('');

    React.useEffect(() => {
        getVaults();
    }, []);

    const getVaults = () => {
        setLoadingData(true);
        VaultService.getVaults((response) => {
            setVaults(response);
            setLoadingData(false);
        }, (errorMessage) => {
            setLoadingData(false);
        });
    }

    const ListItem = ({ item }) => (
        <View>
            <Text>{JSON.stringify(item)}</Text>
        </View>
    );

    return (
        <AppListView loadingData={loadingData} data={vaults} listItem={ListItem}
            onListViewRefreshed={getVaults}
            keyExtractorFunction={item => item.id}
            searchText={searchKey}
            onSearchTextChanged={setSearchKey} />
    );
}