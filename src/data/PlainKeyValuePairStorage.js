import AsyncStorage from '@react-native-async-storage/async-storage';

export default class PlainKeyValuePairStorage {

    static async save(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
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
            return await AsyncStorage.getItem(key);
        } catch (error) {
            console.log(`error getting value for key ${key} from storage. ${error}`);
            throw error;
        }
    }

    static async delete(key) {
        await AsyncStorage.removeItem(key);
    }
}