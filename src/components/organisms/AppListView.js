import * as React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import ListItemSeparator from '../atoms/ListItemSeparator';

export default function AppListView({
    isLoadingData = false,
    data = [],
    listItem = ({ item }) => { },
    onListViewRefreshed = () => { },
    keyExtractorFunction = item => JSON.stringify(item),
    searchText = '',
    onSearchTextChanged = newSearchText => { },
}) {

    React.useEffect(() => {
        onSearchTextChanged(searchText);
    }, []);

    const NoDataView = <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>No data found</Text>
        <Entypo name="box" size={40} color="gray" />
    </View>

    return (
        <FlatList data={data}
            ListEmptyComponent={NoDataView}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={listItem}
            keyExtractor={keyExtractorFunction}
            refreshing={isLoadingData}
            onRefresh={onListViewRefreshed}
        />
    );
}

const styles = StyleSheet.create({
    emptyListContainer: {
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gainsboro'
    },
    emptyListText: {
        fontSize: 16,
        color: '#01010273',
        marginBottom: 4,
    }
});