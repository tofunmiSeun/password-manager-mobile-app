import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Entypo, EvilIcons, Feather, Ionicons } from '@expo/vector-icons';
import ListItemSeparator from '../components/atoms/ListItemSeparator';
import VaultService from '../services/VaultService';
import DetailsPageStyles from './DetailsPageStyles';

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
        <View style={DetailsPageStyles.section}>
            <View>
                {Boolean(vaultRecord.url) && <View style={DetailsPageStyles.formContainer}>
                    <Text style={DetailsPageStyles.formLabel}>url</Text>
                    <View style={DetailsPageStyles.formDataContainer}>
                        <Text style={DetailsPageStyles.formValue}>{vaultRecord.url}</Text>
                        <TouchableOpacity style={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto' }}>
                            <EvilIcons name="external-link" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>}
                {Boolean(vaultRecord.url) && <View style={DetailsPageStyles.formContainer}><ListItemSeparator /></View>}
                <View style={DetailsPageStyles.formContainer}>
                    <Text style={DetailsPageStyles.formLabel}>username</Text>
                    <View style={DetailsPageStyles.formDataContainer}>
                        <Text style={DetailsPageStyles.formValue}>{vaultRecord.username}</Text>
                        <TouchableOpacity
                            style={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto' }}>
                            <Feather name="copy" size={16} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={DetailsPageStyles.formContainer}><ListItemSeparator /></View>
                <View style={DetailsPageStyles.formContainer}>
                    <Text style={DetailsPageStyles.formLabel}>password</Text>
                    <View style={DetailsPageStyles.formDataContainer}>
                        <Text style={DetailsPageStyles.formValue}>
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
            <View style={DetailsPageStyles.section}>
                <View style={{ display: 'none', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity style={DetailsPageStyles.formDataContainer} onPress={deleteRecord}>
                        <Ionicons name="trash" size={24} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}