import AsyncStorage from "@react-native-async-storage/async-storage";
class CAsyncStorage {
  setItem = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting item:", error);
    }
  };

  getItem = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error getting item:", error);
      return null;
    }
  };

  removeItem = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  mergeItem = async (key: string, value: any) => {
    try {
      await AsyncStorage.mergeItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error merging item:", error);
    }
  };

  clear = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error("Error getting all keys:", error);
      return [];
    }
  };

  getAllItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      return items.reduce((accumulator: any, [key, value]) => {
        accumulator[key] = JSON.parse(value || "");
        return accumulator;
      }, {});
    } catch (error) {
      console.error("Error getting all items:", error);
      return {};
    }
  };
}

const asynStorageService = new CAsyncStorage();

export { asynStorageService };
