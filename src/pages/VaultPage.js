import * as React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import FlatListHeader from '../components/organisms/FlatListHeader';
import VaultService from '../services/VaultService';

export default function VaultPage() {
    const [vaults, setVaults] = React.useState([]);

    React.useEffect(() => {
        VaultService.getVaults((response) => {
            setVaults(response);
        }, (errorMessage) => {

        });
    }, []);

    const ListItem = ({ item }) => (
        <View>
            <Text>{JSON.stringify(item)}</Text>
        </View>
    );

    return (
        <FlatList data={vaults}
            ListHeaderComponent={<FlatListHeader title={'Vaults'} />}
            renderItem={ListItem}
            keyExtractor={item => item.id}
        />
    );
}