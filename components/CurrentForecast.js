import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors';
import { formatHeaderDate } from '../utils/time';

const CurrentForecast = ({ currentForecast }) => {

  console.log(currentForecast.cc);

  const formatWind = (cc) => {

    if (typeof (cc.wind_dir) === "string")
      return `${cc.wind_dir} a ${cc.wind_sp} km/h`
    else
      return currentForecast.cc.wind_sp

  }


  return (
    <View style={s.container}>
      <Text style={s.date}>{formatHeaderDate(currentForecast.cc.date)}</Text>

      <View style={s.data}>
        <View style={s.left}>
          <Text style={s.temp}>{currentForecast.cc.temp}°C</Text>
          <Text style={s.stemp}>ST: {currentForecast.cc.st}°C</Text>
          <Text style={s.stemp}>Hum: {currentForecast.cc.hmid}%</Text>
          <Text style={s.stemp}>Viento: {formatWind(currentForecast.cc)} </Text>
          <Text style={[s.stemp, { marginTop: 5 }]}>Actualizado a las {currentForecast.cc.time}</Text>
        </View>

        <View style={s.right}>
          <Image source={{ uri: `https://www.meteobahia.com.ar/imagenes/new/${currentForecast.cc.icon}.png` }} style={s.img} />
          <Text style={s.condition}>{currentForecast.cc.condition}</Text>
        </View>
      </View>
    </View>
  )
}

export default CurrentForecast

const s = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.card,
    marginVertical: 10,
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  left: {
    flexDirection: "column",
    justifyContent: "center",
  },
  right: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5
  },
  temp: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.text,
  },
  stemp: {
    fontSize: 10,
    color: colors.text100,
  },
  date: {
    textAlign: "center",
    color: colors.text100,
    fontWeight:"500",
  },
  condition: {
    
    fontSize: 14,
    textAlign:"center",
    color: colors.text,
  },
  img: {
    width: 60,
    height: 60,
  }
})