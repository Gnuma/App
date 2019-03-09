import { AsyncStorage } from "react-native";

export const updateObject = (oldObject, updatedProprieties) => {
  return {
    ...oldObject,
    ...updatedProprieties
  };
};

export const setItem = async (key, item) => {
  try {
    const jsonOfItem = await AsyncStorage.setItem(key, item);
    return jsonOfItem;
  } catch (error) {
    console.log(error);
  }
};

export const getItem = async key => {
  try {
    const item = await AsyncStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export const multiGet = async keys => {
  try {
    return await AsyncStorage.multiGet(keys);
  } catch (error) {
    console.log(error);
  }
};
