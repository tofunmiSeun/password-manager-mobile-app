import { StyleSheet } from 'react-native';
import { APP_PRIMARY_COLOR } from '../../Utils';

export default StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: APP_PRIMARY_COLOR,
        borderBottomWidth: 1,
        marginBottom: 16
    },
    button: {
        alignItems: 'center',
        padding: 12,
        borderRadius: 32,
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
    },
    errorLabel: {
        color: 'red',
        marginTop: -10,
        marginBottom: 10
    }
});