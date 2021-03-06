import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    section: {
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
        backgroundColor: '#ffffff'
    },
    formContainer: {
        display: 'flex',
        margin: 8,
    },
    formDataContainer: {
        display: 'flex',
        marginTop: 'auto',
        marginBottom: 'auto',
        flexDirection: 'row',
    },
    formLabel: {
        marginBottom: 4,
        color: 'grey',
        fontSize: 12
    },
    formValue: {
        fontSize: 15
    },
});