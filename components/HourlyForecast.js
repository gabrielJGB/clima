import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { Icon } from 'react-native-paper'

const ICON = 11

const getWindText = (dir) => {

  switch (dir) {
    case "N":
      return "Norte";
    case "S":
      return "Sur";
    case "E":
      return "Este";
    case "O":
      return "Oeste";

  }

}

const getBgColor = (value, isRain) => {

  let limits = isRain ? [0, 10, 30, 40, 52, 60] : [0, 23, 32, 39, 55, 60]


  if (value > limits[0] && value < limits[1])
    return "#00b500"

  else if (value >= limits[1] && value < limits[2])
    return "#abff00"

  else if (value >= limits[2] && value < limits[3])
    return "#FFFF00"

  else if (value >= limits[3] && value < limits[4])
    return "#FFBF00"

  else if (value >= limits[4] && value < limits[5])
    return "#FF8000"

  else if (value >= limits[5])
    return "#FF0000"



}


const Bar = ({ value, parameter }) => {

  
  const valueColor = value
  value = value >= 100 ? 100 : value
  value = parameter === "rain" && value > 0 ? (Math.log(value + 1) * (value<50?10:15)) : value

  return (
    <View style={s.bar}>
      <View style={[s.barWidth, { width: `${value.toFixed()}%`, backgroundColor: getBgColor(valueColor, parameter === "rain") }]}></View>
    </View>
  )
}

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
          <View style={s.wheader}>
            {/* <Text style={s.wtitle}>LLUVIA</Text> */}
            <Icon source="water" size={ICON} color='white' />
            <Text style={s.wtext}>{precipitation === "0.0" ? "0" : precipitation} mm</Text>
          </View>

          <Bar
            value={parseFloat(precipitation)}
            parameter={"rain"}
          />
        </View>


        <View style={s.wcontainer}>

          <View style={s.wheader}>
            {/* <Text style={s.wtitle}>VIENTO</Text> */}
            <Icon source="weather-windy" size={ICON} color='white' />
            <Text style={s.wtext}>{wind["@_name"].split(" del ")[0]}  {wind["@_code"][0]}</Text>
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

export default HourlyForecast

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 6,
    paddingVertical: 17,

  },
  timeContainer: {
    width: "20%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 7,

  },
  timeText: {
    fontSize: 12,
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
    width: "25%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginRight: 4,
  },
  condition: {
    fontWeight: "400",
    textAlign: "center",
    color: colors.text,
    fontSize: 11,
    lineHeight: 15,
  },
  weatherData: {
    // backgroundColor:"black",
    flexDirection: "column",

    justifyContent: "center",
    borderRadius: 7,
    alignItems: "flex-start",


  },
  wcontainer: {
    borderWidth: 0,
    borderColor: colors.background,
    padding: 4,

    flexDirection: "column",
    gap: 0,

  },
  wdata: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,

  },
  wtext: {
    fontSize: 10,
    fontWeight: "500",
    color: colors.text100
  },
  bar: {
    width: 80,
    height: 3,
    borderRadius: 4,
    backgroundColor: colors.background,
  },
  barWidth: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 4
  },
  wtitle: {
    color: "white",
    fontWeight: "500",
    fontSize: 10,

  },
  wheader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginBottom: 1
  }
})