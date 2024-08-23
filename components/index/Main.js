import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStateContext } from '../../context/StateProvider'
import { fetchData } from '../../utils/fetch'
import { ActivityIndicator, IconButton, Subheading, Title, TouchableRipple } from 'react-native-paper'
import { agruparPorDia } from '../../utils/weather'

import DayOverview from './DayOverview'
import { formatearFecha } from '../../utils/time'
import CurrentForecast from '../CurrentForecast'

import JSONdata from '../../response_object.json'
import { useRouter } from 'expo-router'

const Main = () => {

  const { push } = useRouter()
  const { selectedCity, refresh } = useStateContext()
  const [dailyForecast, setDailyForecast] = useState(false)
  const [currentForecast, setCurrentForecast] = useState(false)

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (selectedCity) {

      const agrupadosPorDia = agruparPorDia(JSONdata.meteogram.forecast.tabular.time)
      const resultadoFinal = Object.values(agrupadosPorDia)

      const x = resultadoFinal.map((day, i) => {
        return {
          weather: day,
          title: formatearFecha(day[0]["@attributes"].from)
        }
      })
      setDailyForecast(x)
      setCurrentForecast(JSONdata.now)
      setLoading(false)

    }

    // if (selectedCity) {
    //   setLoading(true)

    //   fetchData(selectedCity)
    //     .then(data => {
    //       const agrupadosPorDia = agruparPorDia(data.meteogram.forecast.tabular.time)
    //       const resultadoFinal = Object.values(agrupadosPorDia)

    //       const x = resultadoFinal.map((day, i) => {
    //         return {
    //           weather: day,
    //           title: formatearFecha(day[0]["@attributes"].from)
    //         }
    //       })

    //       setDailyForecast(x)
    //       setCurrentForecast(data.now)


    //     })
    //     .catch(error => setError(error.message))
    //     .finally(() => setLoading(false))
    // }

  }, [selectedCity, refresh])


  if (error)
    return <Text style={s.error}>Ha ocurrido un error: {error}</Text>


  if (loading)
    return <ActivityIndicator size="large" color="white" style={{ marginTop: 100 }} />;

  return (

    <View style={s.container}>

      <View style={s.header}>
        <View style={{ width: 40 }}></View>
        <Text style={s.place}>{currentForecast.Station.city}, {currentForecast.Station.province}</Text>
        <IconButton icon="magnify" iconColor='white' size={30} onPress={() => { push("search") }} />
      </View>

      <CurrentForecast currentForecast={currentForecast} />


      <View style={s.overviewContainer}>
        {

          dailyForecast.map((dayData, i) => (
            <DayOverview key={i} dayData={dayData} />
          ))
        }
      </View>

    </View>

  )
}

export default Main

const s = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",

  },
  place: {
    color: "white",
    fontSize: 19,
    fontWeight: "500",
    textAlign: "center"
  },
  error: {
    padding: 20,
    textAlign: "center",
    color: "white"
  },
  overviewContainer: {
    flexDirection: "column",
    gap: 12,



  }
})