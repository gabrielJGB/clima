import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useStateContext } from '../../context/StateProvider'
import { fetchXML } from '../../utils/fetch'
import { ActivityIndicator, Icon, IconButton, Portal, Snackbar, TouchableRipple } from 'react-native-paper'
import { agruparPorDia } from '../../utils/weather'
import DayOverview from './DayOverview'
import { formatearFecha } from '../../utils/time'
import CurrentForecast from '../CurrentForecast'


import { useFocusEffect, useRouter } from 'expo-router'
import { colors } from '../../constants/colors'
import { cityCodeExists, deleteCityCode, saveCityCode } from '../../utils/storage'

const Main = () => {

  const { push } = useRouter()
  const { selectedCity, refresh,meteogram, setMeteogram } = useStateContext()
  const [dailyForecast, setDailyForecast] = useState(false)
  const [currentForecast, setCurrentForecast] = useState(false)
  const [error, setError] = useState(false)
  const [saveIcon, setSaveIcon] = useState("star-outline")
  const [visible, setVisible] = useState(false);
  
  const [snackText, setSnackText] = useState("")
  const [sun, setSun] = useState(false)

  const onToggleSnackBar = () => {
    setVisible(!visible)
  };

  const onDismissSnackBar = () => setVisible(false);


  const handleSave = async () => {

    if (await cityCodeExists(selectedCity)) {
      await deleteCityCode(selectedCity)
      setSnackText("Ubicación borrada")
    }
    else {
      await saveCityCode(selectedCity)
      setSnackText("Ubicación guardada")
    }

    await checkIcon()
    onToggleSnackBar()

  }


  const checkIcon = async () => {
    const exists = await cityCodeExists(selectedCity)

    if (exists) {
      setSaveIcon("star")
    } else {
      setSaveIcon("star-outline")
    }
  }

  useFocusEffect(useCallback(() => {
    checkIcon()

  }, [selectedCity]))


  //   let meteogram = tabular.map(elem=>({

  //     "temperature":parseFloat(elem.temperature["@_value"]),
  //     "precipitation":parseFloat(elem.precipitation["@_value"]),
  //     "icon":`https://www.meteobahia.com.ar/imagenes/new/${elem.symbol["@_number"]}.png`,
  //     "wind":{
  //         "direction":elem.windDirection["@_code"],
  //         "value":parseFloat(elem.windDirection["@_name"].split(" km/h")[0])
  //     },
  //     "time":{
  //         "from":new Date(elem["@_from"]),
  //         "to":new Date(elem["@_to"]),
  //     }

  // }))

  useEffect(() => {

    if (selectedCity) {

      setCurrentForecast(false)
      setDailyForecast(false)


      const meteogramUrl = `https://meteobahia.com.ar/scripts/meteogramas/${selectedCity}.xml`
      const nowUrl = `https://meteobahia.com.ar/scripts/xml/now-${selectedCity}.xml`

      fetchXML(meteogramUrl)
        .then(res => {
          const data = res.weatherdata
          const agrupadosPorDia = agruparPorDia(data.forecast.tabular.time)
          const resultadoFinal = Object.values(agrupadosPorDia)
          const sunrise = data.sun["@_rise"].split("T")[1].slice(0, 5)
          const sunset = data.sun["@_set"].split("T")[1].slice(0, 5)
          setSun({ sunrise, sunset })

          setMeteogram(resultadoFinal)

          const x = resultadoFinal.map((day, i) => {
            return {
              weather: day,
              title: formatearFecha(day[0]["@_from"]),
              date: day[0]["@_from"],
            }
          })
          x.pop()
          setDailyForecast(x)
        })
        .catch(error => setError(error.message))



      fetchXML(nowUrl)
        .then(res => { setCurrentForecast(res.response) })
        .catch(error => setError(error.message))

    }
  }, [selectedCity, refresh])
  // }, [selectedCity, refresh])


  if (error)
    return <Text style={s.error}>Ha ocurrido un error: {error}</Text>


  if (!dailyForecast || !currentForecast)
    return (
      <View style={s.loadingContainer}>
        <ActivityIndicator size={30} color="white" />
      </View>
    )
  return (

    <View style={s.container}>

      <View style={s.header}>
        <IconButton icon={saveIcon} iconColor='white' size={27} onPress={handleSave} />
        <View style={s.placeContainer}>
          <Text style={s.place}>{currentForecast.Station.name.replace("Parana", "Paraná")}</Text>
          {/* <Text style={s.place}>{currentForecast.Station.province}</Text> */}
        </View>
        <IconButton icon="magnify" iconColor='white' size={25} onPress={() => { push("search") }} />
      </View>

      {
        currentForecast &&
        <CurrentForecast currentForecast={currentForecast} sun={sun} />
      }

      <TouchableRipple rippleColor={colors.card200} borderless unstable_pressDelay={80} style={{ borderRadius: 12 }} onPress={() => push("satellite")}>
        <View style={{ backgroundColor: colors.card, borderRadius: 12, paddingVertical: 11, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Icon source="space-station" color="white" size={22} />
          <Text style={{ color: "white", fontSize: 13 }}>Imágenes satelitales</Text>
        </View>
      </TouchableRipple>

      <TouchableRipple rippleColor={colors.card200} borderless unstable_pressDelay={80} style={{ borderRadius: 12 }} onPress={() => push({
        pathname: "chart"
      })}
      >
        <View style={{ backgroundColor: colors.card, borderRadius: 12, paddingVertical: 11, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Icon source="chart-timeline-variant" color="white" size={22} />
          <Text style={{ color: "white", fontSize: 13 }}>Meteograma</Text>
        </View>
      </TouchableRipple>



      <View style={s.overviewContainer}>
        {
          dailyForecast &&
          dailyForecast.map((dayData, i) => (
            <DayOverview key={i} dayData={dayData} />
          ))
        }
      </View>

      <Portal>
        <Snackbar

          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={2000}
          elevation={5}
        // action={{
        //   label: 'Cerrar',
        //   onPress: () => { setVisible(false) },
        // }}
        >
          {snackText}
        </Snackbar>
      </Portal>

    </View>

  )
}

export default Main

const s = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 200,

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",

  },
  placeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    maxWidth: "70%",

  },
  place: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",

  },
  error: {
    padding: 20,
    textAlign: "center",
    color: "white"
  },
  overviewContainer: {
    flexDirection: "column",
    gap: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: Dimensions.get("window").height
  }

})