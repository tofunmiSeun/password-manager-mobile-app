import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { EvilIcons, Feather, Ionicons } from '@expo/vector-icons';
import Clipboard from 'expo-clipboard';
import ListItemSeparator from '../components/atoms/ListItemSeparator';
import DetailsPageStyles from './DetailsPageStyles';
import Alert from '../components/molecules/Alert';

export default function VaultRecordDetails({ route, navigation }) {
    const { vaultRecord } = route?.params;
    const [isPasswordRevealed, setPasswordRevealed] = React.useState(false);
    const [showClipboardAlert, setShowClipboardAlert] = React.useState(false);

    const getMaskedPassword = () => {
        return "*".repeat(vaultRecord.password.length);
    }

    const copyToClipboard = (text) => {
        Clipboard.setString(text);
        setShowClipboardAlert(true);
        setTimeout(() => { setShowClipboardAlert(false) }, 3500);
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
                        <TouchableOpacity onPress={() => copyToClipboard(vaultRecord.username)}
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
                        <TouchableOpacity onPress={() => copyToClipboard(vaultRecord.password)}
                            style={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto' }}>
                            <Feather name="copy" size={16} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {showClipboardAlert && <Alert message={'Text copied to clipboard!'}
                onClosed={() => setShowClipboardAlert(false)} />}
        </View>
    )
}