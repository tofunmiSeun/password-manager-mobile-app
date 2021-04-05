import { StyleSheet } from 'react-native';

const APP_PRIMARY_COLOR = '#0374e8'; // previously #6205ee
const HEADER_BUTTON_SIZE = 24;

const formatAvatarText = (name) => {
    const splitBySpace = name.split(" ").slice(0, 2)
    let formattedData = ""
    for (const data of splitBySpace) {
        formattedData += data.charAt(0).toUpperCase()
    }
    return formattedData;
}

const ListItemStyles = StyleSheet.create({
    listItemContainer: {
        padding: 16,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row'
    },
    listItemText: {
        fontSize: 18
    },
    listItemSecondaryText: {
        marginTop: 2,
        fontSize: 10,
        color: '#888'
    },
    listItemIcon: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto'
    }
});

export { APP_PRIMARY_COLOR, HEADER_BUTTON_SIZE, formatAvatarText, ListItemStyles }