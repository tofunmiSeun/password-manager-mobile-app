import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppListView from '../components/organisms/AppListView';
import VaultService from '../services/VaultService';
import DeviceService from '../services/DeviceService';
import MasterPasswordContext from '../context/MasterPasswordContext';
import DetailsPageStyles from './DetailsPageStyles';

export default function VaultRecordPage({ route, navigation }) {
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
        return <TouchableOpacity style={styles.listItemContainer} onPress={() => viewVaultRecordDetails(item)}>
            <View>
                <Text style={styles.listItemText}>{item.name}</Text>
                {Boolean(item.url) && <Text style={styles.listItemSecondaryText}>{item.url}</Text>}
            </View>
            <View style={styles.listItemIcon} >
                <Ionicons name="ios-arrow-forward" size={12} color="grey" />
            </View>
        </TouchableOpacity>
    };

    const viewVaultRecordDetails = (vaultRecord) => {
        navigation.push('VaultRecordDetails', { vaultRecord });
    }

    return (
        <View>
            <View style={DetailsPageStyles.section}>
                <View style={DetailsPageStyles.formContainer}>
                    <Text style={DetailsPageStyles.formLabel}>created by</Text>
                    <View style={DetailsPageStyles.formDataContainer}>
                        <Text style={DetailsPageStyles.formValue}>{vault.createdBy}</Text>
                    </View>
                </View>
            </View>
            <AppListView loadingData={loadingData} data={vaultRecords} listItem={ListItem}
                onListViewRefreshed={getVaultRecords}
                keyExtractorFunction={item => item.id}
                searchText={searchKey}
                onSearchTextChanged={setSearchKey} />
        </View>
    );
}

const styles = StyleSheet.create({
    listItemContainer: {
        padding: 16,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row'
    },
    listItemText: {
        fontSize: 17
    },
    listItemSecondaryText: {
        marginTop: 2,
        fontSize: 10,
        color: '#888'
    },
    listItemIcon: {
        marginVertical: 'auto',
        marginLeft: 'auto'
    }
});