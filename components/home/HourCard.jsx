import { View, Text } from 'react-native'
import React from 'react'
import { getIconCode } from '@utils/weather'
import { Image } from 'react-native'

const HourCard = ({ group }) => {


    return (
        <View className='flex flex-col items-center justify-center gap-1'>
            <Image source={{ uri: `https://www.meteobahia.com.ar/imagenes/new/${getIconCode(group.data)}.png` }} style={{ width: 37, height: 37 }} />

            <Text className='text-white text-lg font-semibold'>{Math.round(group.data.temperature["@_value"])}°</Text>
            <Text className='text-gray-400 text-[13px] '>{group.text}</Text>
        </View>
    )
}

export default HourCard