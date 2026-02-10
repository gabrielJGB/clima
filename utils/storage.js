import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveDefaultCityCode = async code => {

  try {
    await AsyncStorage.setItem("defaultCityCode", code)
  } catch (error) {
    console.error(error)
  }

}

export const getDefaultCityCode = async () => {

  try {
    const code = await AsyncStorage.getItem("defaultCityCode")
    return code

  } catch (error) {
    console.error(error)
  }

}



export const removeCity = async () => {
  try {
    await AsyncStorage.removeItem("city")
  } catch (error) {
    console.error(error)
  }

}



export const cityCodeExists = async (code) => {
  try {
    const codes = await getCityCodes();
    return codes.includes(code);
  } catch (error) {
    console.error(error);
    return false;
  }
}



const CITY_CODES_KEY = 'city_codes';


export const saveCityCode = async (code) => {
  try {
    const codes = await getCityCodes();
    if (!codes.includes(code)) {
      const updatedCodes = [...codes, code];
      await AsyncStorage.setItem(CITY_CODES_KEY, JSON.stringify(updatedCodes));
    }
  } catch (error) {
    console.error('Failed to save city code:', error);
  }
};


export const getCityCodes = async () => {
  try {
    const codes = await AsyncStorage.getItem(CITY_CODES_KEY);
    return codes ? JSON.parse(codes) : [];
  } catch (error) {
    console.error('Failed to get city codes:', error);
    return [];
  }
};

export const deleteCityCode = async (code) => {
  try {
    const codes = await getCityCodes();
    const updatedCodes = codes.filter((item) => item !== code);
    await AsyncStorage.setItem(CITY_CODES_KEY, JSON.stringify(updatedCodes));
  } catch (error) {
    console.error('Failed to delete city code:', error);
  }
};


