import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useStateContext } from '@context/StateProvider'
import { Link } from 'expo-router'
import useSWR from 'swr'
import { fetchXML } from '@utils/helpers'
import CurrentWeather from '@components/home/CurrentWeather'
import Header from '@components/home/Header'
import ForecastView from '@components/home/ForecastView'
import { ActivityIndicator } from 'react-native-paper'
import HomeButtons from '@components/home/HomeButtons'

const MainView = () => {

  const { selectedCity, refresh } = useStateContext()
  const [currentWeather, setCurrentWeather] = useState(false)
  const url = `https://meteobahia.com.ar/scripts/xml/now-${selectedCity}.xml?_${refresh}`

  const { data, error, isLoading } = useSWR(
    url,
    fetchXML,
    {
      revalidateOnFocus: false,
      onSuccess: data => { setCurrentWeather(data.response) }
    }
  );


  if (isLoading || !currentWeather)
    return <ActivityIndicator size={40} color='white' style={{ marginTop: 50 }} />

  if (error)
    return <Text className='text-red-800 font-semibold text-center p-4'>Error: {error?.message}</Text>


  return (
    <ScrollView>
      <View className='flex flex-col gap-2 p-2 pb-40 '>

        <Header station={currentWeather.Station} />
        <CurrentWeather cc={currentWeather.cc} />
        <HomeButtons/>
        <ForecastView />

      </View>
    </ScrollView>
  )
}

export default MainView