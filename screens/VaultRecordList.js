import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TextInput, SectionList, TouchableOpacity, Text} from 'react-native';

import ListItem from '../components/ListItem';
import SectionedListHeader from '../components/SectionedListHeader';
import {SERVER_URL} from '../Utils';

const renderSeparator = () => {
    return <View style={{height: 1, backgroundColor: "#CED0CE"}}/>;
};

export default function VaultRecordList({navigation}) {
    const [records, setRecords] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        getAll();
    }, []);

    const getAll = () => {
        fetch(SERVER_URL + '/sectioned')
        .then(response => response.json())
        .then(responseJson => setRecords(responseJson));
    }

    const search = (text) => {
        setSearchText(text)
        if (text.length === 0) {
            getAll()
        } else {
            fetch(SERVER_URL + '/sectioned/search?searchKey=' + text)
            .then(response => response.json())
            .then(responseJson => setRecords(responseJson));
        }
    }

    return (
        <View>
            <SectionList sections={records} renderItem={({item}) => 
                <ListItem record={item} navigation={navigation} />}
                ListHeaderComponent={(
                    <View style={styles.searchContainer}>
                        <TextInput placeholder={'Search'} value={searchText}
                            onChangeText={text => search(text)}
                            style={styles.searchBar}/>
                        <TouchableOpacity style={styles.cancelSearch} onPress={() => search('')}>
                            <Text style={{color: 'grey'}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                  )}
                ItemSeparatorComponent={renderSeparator}
                renderSectionHeader={({ section: { title } }) => (
                    <SectionedListHeader title={title}/>
                  )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 8
    },
    searchBar: {
        padding: 6,
        borderColor: '#908e8e54',
        backgroundColor: '#e6e6e6',
        borderWidth: 1,
        borderRadius: 3,
        flexGrow: 1
    },
    cancelSearch: {
        marginVertical: 'auto',
        marginLeft: 6,
        padding: 6,
        borderColor: '#908e8e54',
        borderWidth: 1,
        borderRadius: 3
    }
});