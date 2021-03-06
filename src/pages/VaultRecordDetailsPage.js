import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo, EvilIcons, Feather, Ionicons } from '@expo/vector-icons';
import ListItemSeparator from '../components/atoms/ListItemSeparator';
import VaultService from '../services/VaultService';

export default function VaultRecordDetails({ route, navigation }) {
    const { vaultRecord } = route?.params;
    const [isPasswordRevealed, setPasswordRevealed] = React.useState(false);

    const getMaskedPassword = () => {
        return "*".repeat(vaultRecord.password.length);
    }

    const deleteRecord = () => {
        VaultService.deleteVaultRecord(vaultRecord.id, () => {
            navigation.goBack();
        }, (errorMessage) => console.log(errorMessage));
    }

    return (
        <View style={{ margin: 16 }}>
            <View style={styles.section}>
                <View style={styles.formContainer}>
                    <Text style={styles.formLabel}>url</Text>
                    <View style={styles.formDataContainer}>
                        <Text style={styles.formValue}>{vaultRecord.url}</Text>
                        <TouchableOpacity style={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto' }}>
                            <EvilIcons name="external-link" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <ListItemSeparator />
                <View style={styles.formContainer}>
                    <Text style={styles.formLabel}>username</Text>
                    <View style={styles.formDataContainer}>
                        <Text style={styles.formValue}>{vaultRecord.username}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.formContainer}>
                    <Text style={styles.formLabel}>password</Text>
                    <View style={styles.formDataContainer}>
                        <Text style={styles.formValue}>
                            {isPasswordRevealed ? vaultRecord.password : getMaskedPassword()}
                        </Text>
                        <TouchableOpacity onPress={() => setPasswordRevealed(!isPasswordRevealed)}
                            style={{ marginTop: 'auto', marginLeft: 16 }}>
                            <Ionicons name={isPasswordRevealed ? 'ios-eye-off' : 'ios-eye'}
                                size={16} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto' }}>
                            <Feather name="copy" size={16} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <TouchableOpacity style={styles.formDataContainer} onPress={deleteRecord}>
                    <EvilIcons name="trash" size={24} color="red" />
                    <Text style={{ color: 'red', marginLeft: 4, fontSize: 15 }}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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