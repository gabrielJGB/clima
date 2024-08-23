import AsyncStorage from "@react-native-async-storage/async-storage";


export const saveCity = async (code) => {

    try {
        await AsyncStorage.setItem('city', code)
    } catch (error) {
        console.error(error)
    }

}


export const removeCity = async  ()=>{
    await AsyncStorage.removeItem("city")
}




// export const setSavedCity = async (code) => {
//     try {
//         await AsyncStorage.setItem('cityCode', JSON.stringify({ 'cityCode': code }))

//     } catch (e) {
//         console.error(e)
//     }
// }


// export const getSavedCity = async () => {
//     try {

//         const cityCode = JSON.parse(await AsyncStorage.getItem('cityCode'))
//         return cityCode

//     } catch (e) {
//         console.error(e)
//         return false
//     }
// }

// export const clearCity = async ()=>{
//     try {
//         await AsyncStorage.setItem('cityCode',null)

//     } catch (e) {
//         console.error(e)
//     }

// }


