import { Platform } from 'react-native';
import PlainKeyValuePairStorage from '../data/PlainKeyValuePairStorage';
import SecureKeyValuePairStorage from '../data/SecureKeyValuePairStorage';

const DEVICE_DETAILS_KEY = 'REGISTERED_DEVICE_CREDENTIAALS';

export async function isDeviceRegistered() {
    return Platform.OS !== 'web' ? SecureKeyValuePairStorage.containsKey(DEVICE_DETAILS_KEY) :
        PlainKeyValuePairStorage.containsKey(DEVICE_DETAILS_KEY);
}