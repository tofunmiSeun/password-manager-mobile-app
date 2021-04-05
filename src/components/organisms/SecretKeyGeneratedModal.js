import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import Clipboard from 'expo-clipboard';
import { Feather } from '@expo/vector-icons';
import ModalTemplate from '../templates/ModalTemplate';
import Alert from '../molecules/Alert';


export default function SecretKeyGeneratedModal({ isVisible, secretKey, onModalClosed = () => { }, onProceed = () => { } }) {
    const [showClipboardAlert, setShowClipboardAlert] = React.useState(false);

    const copyToClipboard = () => {
        Clipboard.setString(secretKey);
        setShowClipboardAlert(true);
        setTimeout(() => { setShowClipboardAlert(false) }, 3500);
    }

    return <ModalTemplate modalVisible={isVisible} onModalDismissed={onModalClosed} modalContent={
        <View>
            <Text>Device registered!</Text>
            <Text>{'Secret key: ' + secretKey}</Text>
            <TouchableOpacity onPress={() => copyToClipboard()} style={{}}>
                <Feather name="copy" size={20} color="black" />
            </TouchableOpacity>
            <Text>Kindly keep this key in a secured place as you might need it if you ever need to recover your device</Text>
            <TouchableOpacity onPress={onProceed}>
                <Text>Proceed</Text>
            </TouchableOpacity>
            {showClipboardAlert && <Alert message={'Text copied to clipboard!'} onClosed={() => setShowClipboardAlert(false)} />}
        </View>}>
    </ModalTemplate>
}