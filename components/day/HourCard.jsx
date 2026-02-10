import { View, Text, Image } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-paper'
import Bar from '@components/day/Bar'

const HourCard = ({ data }) => {


    const from = data["@_from"].split("T")[1].slice(0, 5)
    const to = data["@_to"].split("T")[1].slice(0, 5)
    const temp = data.temperature["@_value"]
    const condition = data.symbol["@_name"]
    const precipitation = data.precipitation["@_value"]
    const wind = data.windDirection
    // const pressure = data.pressure["@_value"]
    const svar = data.symbol["@_var"]
    let symbol = data.symbol["@_number"]
    const ICON = 11



    if (svar === "01n") {
        if (from === "00:00" || from === "03:00" || from === "21:00") {
            symbol = "1n"
        }
        else if (from === "06:00" || from === "09:00") {
            symbol = "1"
        }
    } else if (svar === "02n") {
        if (from === "00:00" || from === "03:00" || from === "21:00") {
            symbol = "2n"
        }
    }

    return (
        <View className='flex flex-row justify-between items-center bg-slate-900/70 rounded-lg px-3 h-[80px] py-2 '>
            <View>
                <Text className='text-gray-200 text-[13px]'>{from}</Text>
                <Text className='text-gray-200 text-[13px]'>{to}</Text>
            </View>

            <Text className='text-white text-[33px] font-semibold'>{Math.round(temp)}°</Text>

            <View className='flex flex-col justify-center items-center w-[25%]'>
                <Image source={{ uri: `https://www.meteobahia.com.ar/imagenes/new/${symbol}.png` }} style={{ width: 32, height: 32 }} />
                <Text className='text-white text-xs text-center'>{condition}</Text>
            </View>


            <View className='flex flex-col gap-1'>

                <View className='flex flex-col gap-[2px]'>
                    <View className='flex flex-row items-center gap-1'>

                        <Icon source="water" size={ICON} color='white' />
                        <Text className='text-gray-400 text-[10px] font-semibold'>{precipitation === "0.0" ? "0" : precipitation} mm</Text>
                    </View>

                    <Bar
                        value={parseFloat(precipitation)}
                        parameter={"rain"}
                    />
                </View>


                <View className='flex flex-col gap-[2px]'>

                    <View className='flex flex-row   items-center  gap-1'>
                        <Icon source="weather-windy" size={ICON} color='white' />
                        <Text className='text-gray-400 text-[10px] font-semibold'>{wind["@_name"].split(" del ")[0]}  {wind["@_code"][0]}</Text>
                    </View>

                    <Bar
                        value={parseInt(wind["@_name"].split(" km")[0])}
                        parameter={"wind"}
                    />

                </View>


            </View>
        </View>
    )
}

export default HourCard