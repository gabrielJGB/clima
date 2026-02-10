import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useStateContext } from '@context/StateProvider'
import useSWR from 'swr'
import { fetchXML } from '@utils/helpers'
import { groupByDay } from '@utils/weather'
import { formatDayCardDate } from '@utils/time'
import DayCard from '@components/home/DayCard'
import { ActivityIndicator } from 'react-native-paper'

const ForecastView = () => {

    const { selectedCity, setForecastArray,setSun,setMeteogram } = useStateContext()
    
    const [dailyForecast, setDailyForecast] = useState(null)
    const url = `https://meteobahia.com.ar/scripts/meteogramas/${selectedCity}.xml`

    const { error, isLoading } = useSWR(
        url,
        fetchXML,
        {
            revalidateOnFocus: false,
            onSuccess: data => {
                const time = data.weatherdata.forecast.tabular.time
                const group = groupByDay(time)
                const res = Object.values(group)
                const sunrise = data.weatherdata.sun["@_rise"].split("T")[1].slice(0, 5)
                const sunset = data.weatherdata.sun["@_set"].split("T")[1].slice(0, 5)
                
                setSun({ sunrise, sunset })

                const x = res.map((day, i) => {
                    return {
                        weather: day,
                        title: formatDayCardDate(day[0]["@_from"]),
                        date: day[0]["@_from"],
                    }
                })
                x.pop()
                setMeteogram(res)
                setForecastArray(group)
                setDailyForecast(x)
            }
        }
    );



    if (isLoading || dailyForecast === null)
        return <View className="flex flex-col gap-3">
            <View className="bg-slate-900/90 h-[170px] w-full rounded-lg"></View>
            <View className="bg-slate-900/90 h-[170px] w-full rounded-lg"></View>
            <View className="bg-slate-900/90 h-[170px] w-full rounded-lg"></View>
            <View className="bg-slate-900/90 h-[170px] w-full rounded-lg"></View>
            <View className="bg-slate-900/90 h-[170px] w-full rounded-lg"></View>
        </View>

    if (error)
        return <Text className='text-red-600 font-semibold text-center p-4'>Error: {error.message}</Text>



    return (
        <ScrollView >
            <View className='flex flex-col gap-3'>

                {
                    dailyForecast?.filter(d=>!d.title.includes("Ayer")).map((data, i) => (
                        <DayCard key={i} data={data} />
                    ))
                }
            </View>

        </ScrollView>
    )
}

export default ForecastView