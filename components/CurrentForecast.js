import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors';
import { formatHeaderDate } from '../utils/time';
import sunset from '../assets/sunset.png'
import sunrise from '../assets/sunrise.png'

const CurrentForecast = ({ currentForecast,sun }) => {



  const formatWind = (cc) => {
 
    if (cc.wind_dir === "" || !cc.wind_dir)
      return currentForecast.cc.wind_sp
    else
      return `${cc.wind_dir} a ${cc.wind_sp} km/h`

  }

  const checkDate = (fecha, hora) => {

    const now = new Date();
    const fechaHora = new Date(`${fecha} ${hora}`);
    const diferenciaEnMilisegundos = now - fechaHora;
    const dosHorasEnMilisegundos = 2 * 60 * 60 * 1000;
    return diferenciaEnMilisegundos > dosHorasEnMilisegundos;
  }

  const isOutdated = checkDate(currentForecast.cc.date, currentForecast.cc.time)

  return (
    <>
      {
        currentForecast.cc.date != "1969/12/31" ?

          <View style={s.container}>
            <Text style={s.date}>{formatHeaderDate(currentForecast.cc.date)}</Text>



            <View style={s.data}>
              <View style={s.left}>
                <Text style={s.temp}>{currentForecast.cc.temp}°C</Text>
                <Text style={s.stemp}>ST: <Text style={s.text}>{currentForecast.cc.st}°C</Text></Text>
                <Text style={s.stemp}>Viento: <Text style={s.text}>{formatWind(currentForecast.cc)}</Text></Text>
                <Text style={s.stemp}>Precip: <Text style={s.text}>{currentForecast.cc.pp} mm</Text></Text>
                <Text style={s.stemp}>Hum: <Text style={s.text}>{currentForecast.cc.hmid}%</Text></Text>

                <Text style={[{ fontSize: 11, marginTop: 5, color: (isOutdated ? "#b32828" : colors.text100) }]}>Actualizado a las {currentForecast.cc.time}</Text>
              </View>

              <View style={s.right}>

                <View style={s.conditionContainer}>
                  <Image source={{ uri: `https://www.meteobahia.com.ar/imagenes/new/${currentForecast.cc.icon}.png` }} style={s.img} />
                  <Text style={s.condition}>{currentForecast.cc.condition}</Text>
                </View>

                <View style={s.sun}>
                  <View style={s.sunItem}>
                    <Image source={sunrise} style={s.sunImg} />
                    <Text style={s.sunText}>{sun.sunrise}</Text>
                  </View>
                  <View style={s.sunItem}>
                    <Image source={sunset} style={s.sunImg} />
                    <Text style={s.sunText}>{sun.sunset}</Text>
                  </View>
                </View>

              </View>
            </View>
          </View>
          :
          <View style={s.errorContainer}>
            <Image source={{ uri: "https://www.meteobahia.com.ar/imagenes/new/nodisponible.png" }} style={s.img} />
            <Text style={s.error}>Estación meteorológica fuera de linea</Text>
          </View>

      }
    </>
  )
}

export default CurrentForecast

const s = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 12,
    padding: 12,
    paddingBottom:16,
    borderRadius: 12,
    backgroundColor: colors.card,

  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    borderRadius: 12,
    padding: 18,
    backgroundColor: colors.card,
  },
  error: {
    fontSize: 13,
    color: colors.text
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  left: {
    maxWidth:"50%",
    flexDirection: "column",
    justifyContent: "center",
    gap: 2
  },
  right: {
    
    maxWidth:"42%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  temp: {
    fontSize: 45,
    fontWeight: "bold",
    color: colors.text,
  },
  stemp: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.text100,
  },
  date: {
    textAlign: "center",
    color: colors.text100,
    fontWeight: "500",
  },
  conditionContainer:{
    
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center"
  },
  condition: {

    fontSize: 14,
    textAlign: "center",
    color: colors.text,
  },
  img: {
    width: 62,
    height: 62,
  },
  text: {
    color: "white",
    fontSize: 12,
  },
  sun: {
    flexDirection: "row",
    gap:12,
    alignItems: "flex-end",
    justifyContent:"flex-end",
     
    
  },
  sunImg:{
    width:25,
    height:25,
  },
  sunItem: {
    flexDirection: "column",
    alignItems:"center",
  },
  sunText:{
    color:"white",
    fontSize:9,
    fontWeight:"500"
  }

})