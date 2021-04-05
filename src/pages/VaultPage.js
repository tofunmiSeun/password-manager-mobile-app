import * as React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppListView from '../components/organisms/AppListView';
import VaultService from '../services/VaultService';
import DeviceService from '../services/DeviceService';
import { ListItemStyles } from '../Utils';

export default function VaultPage({ navigation }) {
    const [vaults, setVaults] = React.useState([]);
    const [loadingData, setLoadingData] = React.useState(false);
    const [searchKey, setSearchKey] = React.useState('');

    React.useEffect(() => {
        getVaults();
    }, []);

    const getVaults = async () => {
        setLoadingData(true);
        const deviceId = await DeviceService.getDeviceId();
        VaultService.getVaults(deviceId, (response) => {
            setVaults(response);
            setLoadingData(false);
        }, (errorMessage) => {
            setLoadingData(false);
        });
    }

    const ListItem = ({ item }) => (
        <TouchableOpacity style={ListItemStyles.listItemContainer}
            onPress={() => viewRecordsInVault(item)}>
            <Text style={ListItemStyles.listItemText}>{item.name}</Text>
            <View style={ListItemStyles.listItemIcon} >
                <Ionicons name="ios-arrow-forward" size={16} color="grey" />
            </View>
        </TouchableOpacity>
    );

    const viewRecordsInVault = (vault) => {
        navigation.navigate('VaultRecords', { vault });
    }

    return (
        <AppListView loadingData={loadingData} data={vaults} listItem={ListItem}
            onListViewRefreshed={getVaults}
            keyExtractorFunction={item => item.id}
            searchText={searchKey}
            onSearchTextChanged={setSearchKey} />
    );
}