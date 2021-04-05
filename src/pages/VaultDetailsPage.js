import * as React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppListView from '../components/organisms/AppListView';
import VaultService from '../services/VaultService';
import DeviceService from '../services/DeviceService';
import MasterPasswordContext from '../context/MasterPasswordContext';
import { ListItemStyles } from '../Utils';

export default function VaultDetailsPage({ route, navigation }) {
    const { vault } = route?.params;
    const masterPassword = React.useContext(MasterPasswordContext);

    const [vaultRecords, setVaultRecords] = React.useState([]);
    const [loadingData, setLoadingData] = React.useState(false);
    const [searchKey, setSearchKey] = React.useState('');

    React.useEffect(() => {
        getVaultRecords();
    }, []);

    const getVaultRecords = async () => {
        setLoadingData(true);

        const deviceDetails = await DeviceService.getDeviceDetails();
        const deviceId = deviceDetails.deviceId;

        VaultService.getVaultKey(vault.id, deviceId, async (vaultKeyResponse) => {
            const plainKey = await VaultService.decryptVaultKey(masterPassword, deviceDetails, vaultKeyResponse.encryptedVaultKey);
            VaultService.getVaultRecords(vault.id, (response) => {
                setVaultRecords(response.map(e => VaultService.decryptVaultRecord(plainKey, e)));
                setLoadingData(false);
            }, onSubmissionFailed);

        }, onSubmissionFailed);
    }

    const onSubmissionFailed = (errorMessage) => {
        setLoadingData(false);
    }

    const ListItem = ({ item }) => {
        return <TouchableOpacity style={ListItemStyles.listItemContainer} onPress={() => viewVaultRecordDetails(item)}>
            <View>
                <Text style={ListItemStyles.listItemText}>{item.name}</Text>
                {Boolean(item.url) && <Text style={ListItemStyles.listItemSecondaryText}>{item.username}</Text>}
            </View>
            <View style={ListItemStyles.listItemIcon} >
                <Ionicons name="ios-arrow-forward" size={16} color="grey" />
            </View>
        </TouchableOpacity>
    };

    const viewVaultRecordDetails = (vaultRecord) => {
        navigation.push('VaultRecordDetails', { vaultRecord });
    }

    return <AppListView loadingData={loadingData} data={vaultRecords} listItem={ListItem}
        onListViewRefreshed={getVaultRecords}
        keyExtractorFunction={item => item.id}
        searchText={searchKey}
        onSearchTextChanged={setSearchKey} />;
}