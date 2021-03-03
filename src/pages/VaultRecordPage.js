import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import AppListView from '../components/organisms/AppListView';
import VaultService from '../services/VaultService';
import DeviceService from '../services/DeviceService';
import MasterPasswordContext from '../context/MasterPasswordContext';

export default function VaultRecordPage({ route }) {
    const { vaultId, vaultName } = route?.params;
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

        VaultService.getVaultKey(vaultId, deviceId, async (vaultKeyResponse) => {
            const plainKey = await VaultService.decryptVaultKey(masterPassword, deviceDetails, vaultKeyResponse.encryptedVaultKey);
            VaultService.getVaultRecords(vaultId, (response) => {
                setVaultRecords(response.map(e => VaultService.decryptVaultRecord(plainKey, e)));
                setLoadingData(false);
            }, onSubmissionFailed);

        }, onSubmissionFailed);
    }

    const onSubmissionFailed = (errorMessage) => {
        setLoadingData(false);
    }

    const ListItem = ({ item }) => {
        return <TouchableOpacity style={{ padding: 16, backgroundColor: '#fff' }}>
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
        </TouchableOpacity>
    };

    return (
        <AppListView loadingData={loadingData} data={vaultRecords} listItem={ListItem}
            onListViewRefreshed={getVaultRecords}
            keyExtractorFunction={item => item.id}
            searchText={searchKey}
            onSearchTextChanged={setSearchKey} />
    );
}