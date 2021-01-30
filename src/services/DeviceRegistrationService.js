import { Platform } from 'react-native';
import PlainKeyValuePairStorage from '../storage/PlainKeyValuePairStorage';
import SecureKeyValuePairStorage from '../storage/SecureKeyValuePairStorage';

const DEVICE_DETAILS_KEY = 'REGISTERED_DEVICE_CREDENTIAALS';

export async function isDeviceRegistered() {
    return Platform.OS !== 'web' ? SecureKeyValuePairStorage.containsKey(DEVICE_DETAILS_KEY) :
        PlainKeyValuePairStorage.containsKey(DEVICE_DETAILS_KEY);
}