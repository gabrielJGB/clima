import { View, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Icon, IconButton } from 'react-native-paper'
import { useFocusEffect, useRouter } from 'expo-router'
import { useStateContext } from '../../context/StateProvider'
import { cityCodeExists, deleteCityCode, saveCityCode } from '../../utils/storage'


const Header = ({ station }) => {

    const { push } = useRouter()
    const { selectedCity } = useStateContext()
    const { name, lat, lon, alt, city, province, country, zone, institute } = station
    const [saveIcon, setSaveIcon] = useState("star-outline")

    useFocusEffect(useCallback(() => {
        checkIcon()

    }, [selectedCity]))

    const handleSave = async () => {

        if (await cityCodeExists(selectedCity)) {
            await deleteCityCode(selectedCity)

        }
        else {
            await saveCityCode(selectedCity)

        }

        await checkIcon()


    }


    const checkIcon = async () => {
        const exists = await cityCodeExists(selectedCity)

        if (exists) {
            setSaveIcon("star")
        } else {
            setSaveIcon("star-outline")
        }
    }



    return (
        <View className='flex flex-row justify-between items-center w-full p-0'>
            <IconButton icon={saveIcon} iconColor='white' size={27} onPress={handleSave} />
            <Text className='text-white font-semibold text-[20px] text-center'>{name}</Text>
            <IconButton icon="magnify" iconColor='white' size={25} onPress={() => { push("search") }} />
        </View>
    )
}

export default Header