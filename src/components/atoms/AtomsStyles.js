import { StyleSheet } from 'react-native';
import { APP_PRIMARY_COLOR } from '../../Utils';

export default StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16
    },
    button: {
        alignItems: 'center',
        padding: 8,
        borderRadius: 4,
        backgroundColor: APP_PRIMARY_COLOR
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    selectBox: {
        marginBottom: 16
    }
});