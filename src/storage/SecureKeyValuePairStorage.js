import * as SecureStore from 'expo-secure-store';

export default class SecureKeyValuePairStorage {

    static async save(key, value) {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (error) {
            console.log(`error saving key ${key} to storage. ${error}`);
            throw error;
        }
    }

    static async containsKey(key) {
        return await this.get(key) != null
    }

    static async get(key) {
        try {
            return await SecureStore.getItemAsync(key);
        } catch (error) {
            console.log(`error getting value for key ${key} from storage. ${error}`);
            throw error;
        }
    }

    static async delete(key) {
        await SecureStore.deleteItemAsync(key);
    }
}