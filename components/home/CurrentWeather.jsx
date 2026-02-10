import { View, Text, Image } from 'react-native'
import React from 'react'
import { formatHeaderDate } from '@utils/time'
import { useStateContext } from '@context/StateProvider'
import sunset from '../../assets/sunset.png'
import sunrise from '../../assets/sunrise.png'

const CurrentWeather = ({ cc }) => {

    const ICON = 22
    const { sun } = useStateContext()
    const { condition, date, dir, hmid, pp, pres, rad, icon, st, temp, time, uv, wind_dir, wind_sp } = cc
    const items = [
        {
            name: "ST",
            value: `${st}°C`
        },
        {
            name: "Viento",
            value: wind_sp === "Calma"? wind_sp : `${wind_dir} a ${wind_sp} km/h`
        },
        {
            name: "Lluvia",
            value: `${pp} mm`
        },
        {
            name: "Humedad",
            value: `${hmid} %`
        }
    ]


    return (
        <View className='flex flex-col gap-2 bg-slate-900/70 rounded-[12px] px-10 py-4'>
            <Text className='text-center text-[18px] font-semibold text-gray-300'>{formatHeaderDate(date, true)}</Text>

            <View className='flex flex-row justify-between gap-3'>
                <View className='flex flex-col gap-2'>
                    <Text className='text-white text-[40px] font-semibold'>{temp}°C</Text>
                    <View className='flex flex-col gap-[6px]'>
                        {
                            items.map((item, i) => (
                                <View key={i} className='flex flex-row items-center gap-1'>
                                    <Text className='text-gray-400 text-[11px]'>{item.name}:</Text>
                                    <Text className='text-white text-[11px] font-semibold'>{item.value}</Text>
                                </View>
                            ))
                        }
                    </View>
                    <Text className='text-gray-400 text-[11px]'>Actualizado a las {time}</Text>

                </View>

                <View className='flex flex-col justify-between max-w-[52%]'>

                    <View className='flex flex-col justify-center items-center'>
                        <Image source={{ uri: `https://www.meteobahia.com.ar/imagenes/new/${icon}.png` }} style={{ width: 62, height: 62 }} />
                        <Text className='text-gray-100 text-center break-words'>Mayomente {condition}</Text>
                    </View>

                    <View className='flex flex-row w-full justify-evenly'>

                        <View className='flex flex-col justify-center items-center'>
                            <Image source={sunrise} style={{width:ICON,height:ICON}} />
                            <Text className='text-white text-xs'>{sun.sunrise}</Text>
                        </View>

                        <View className='flex flex-col justify-center items-center'>
                            <Image source={sunset} style={{width:ICON,height:ICON}} />
                            <Text className="text-white text-xs">{sun.sunset}</Text>
                        </View>
                        
                    </View>

                </View>
            </View>
        </View>
    )
}

export default CurrentWeather