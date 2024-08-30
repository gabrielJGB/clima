import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { Icon } from 'react-native-paper'

const HourlyForecast = ({ data }) => {

  const from = data["@_from"].split("T")[1].slice(0, 5)
  const to = data["@_to"].split("T")[1].slice(0, 5)
  const temp = data.temperature["@_value"]
  const symbol = data.symbol["@_number"]
  const condition = data.symbol["@_name"]
  const precipitation = data.precipitation["@_value"]
  const wind = data.windDirection
  const pressure = data.pressure["@_value"]
  

  return (
    <View style={s.container}>
      <View style={s.timeContainer}>
        <Text style={s.timeText}>{from}</Text>
        <Text style={s.timeText}>{to}</Text>
      </View>

      <Text style={s.temp}>{temp}°</Text>

      <View style={s.symbolContainer}>
        <Image source={{ uri: `https://www.meteobahia.com.ar/imagenes/new/${symbol}.png` }} style={s.img} />
        <Text style={s.condition}>{condition}</Text>
      </View>


      <View style={s.weatherData}>

        <View style={s.wcontainer}>
          <Icon source="weather-windy" size={12} color='white' />
          <Text style={s.wtext}>{wind["@_name"]}</Text>
        </View>

        <View style={s.wcontainer}>
          <Icon source="water" size={12} color='white' />
          <Text style={s.wtext}>{precipitation === "0.0"?"0":precipitation} mm</Text>
        </View>

 

      </View>
    </View>
  )
}

export default HourlyForecast

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    paddingVertical: 15,

  },
  timeContainer: {
    width: "20%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    
  },
  timeText: {
    fontSize:12,
    color: colors.text,
    textAlign: "center",
  },
  temp: {
    minWidth: "20%",
    color: colors.text,
    fontWeight: "bold",
    fontSize: 33,
    padding: 7,
    textAlign: "center"
  },
  img: {
    width: 30,
    height: 30,
  },
  symbolContainer: {
    width: "30%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginRight: 4,
  },
  condition: {
    width:"90%",
    textAlign: "center",
    color: colors.text,
    fontSize: 11,
    lineHeight:15,
  },
  weatherData:{
    width:"30%",
    flexDirection:"column",
    justifyContent:"center",
    gap:2,
    alignItems:"flex-start"
    
  },
  wcontainer:{
    flexDirection:"row",
    alignItems:"center",
    gap:3,
  },
  wtext:{
    fontSize:10,
    fontWeight:"500",
    color:colors.text100
  }
})