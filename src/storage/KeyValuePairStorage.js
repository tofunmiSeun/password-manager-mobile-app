import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

async function savePlain(key, value) {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(`error saving key ${key} to storage. ${error}`);
        throw error;
    }
}

async function getPlain(key) {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        console.log(`error getting value for key ${key} from storage. ${error}`);
        throw error;
    }
}

async function deletePlain(key) {
    await AsyncStorage.removeItem(key);
}

async function saveSecured(key, value) {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        console.log(`error saving key ${key} to storage. ${error}`);
        throw error;
    }
}

async function getSecured(key) {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (error) {
        console.log(`error getting value for key ${key} from storage. ${error}`);
        throw error;
    }
}

async function deleteSecured(key) {
    await SecureStore.deleteItemAsync(key);
}

export default class KeyValuePairStorage {

    static async save(key, value) {
        return this.isWebDeployment() ? savePlain(key, value) : saveSecured(key, value);
    }

    static async get(key) {
        return this.isWebDeployment() ? getPlain(key) : getSecured(key);
    }

    static async containsKey(key) {
        return await this.get(key) != null;
    }

    static async delete(key) {
        return this.isWebDeployment() ? deletePlain(key) : deleteSecured(key);
    }

    static isWebDeployment() {
        return Platform.OS === 'web';
    }
}