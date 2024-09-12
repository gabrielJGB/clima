import React from 'react';
import { View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import Svg, { Polyline, G, Text, } from 'react-native-svg';
import { colors } from '../constants/colors';
import { useLocalSearchParams } from 'expo-router';
import { useStateContext } from '../context/StateProvider';

const CustomChart = ({ data, lineColor, unit, param, height }) => {
  const { width } = Dimensions.get('window');

  // Obtener el rango de temperaturas
  const values = data.map(item => item.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // Escalado de puntos
  const scaleX = data.length / 3;
  const scaleY = param === "time" ? 10 : (height - 2) / (maxValue - minValue);


  // Crear los puntos para el Polyline
  const points = data.map((item, index) => {
    const x = index * scaleX;
    const y = param === "time" ? 10 : ((maxValue - item.value) * scaleY); // Invertir para que mayor temp esté arriba
    return `${x},${y}`;
  }).join(' ');

  return (

    <View style={s.chart}>
      <Svg height={height} width={data.length * 50} style={{ backgroundColor: colors.card }}>
        {/* Polyline para el gráfico */}
        <G>
          <Polyline
            points={points}
            fill="none"
            stroke={lineColor}
            strokeWidth="2"
          />

          {/* Etiquetas de temperatura */}
          {data.map((item, index) => (
            <Text
              key={index}
              x={index * scaleX}
              y={param === "time" ? 10 : (maxValue - item.value) * scaleY + (param === "temp" ? 10 : -4)} // Ajuste de posición
              lengthAdjust='spacing'
              fontSize="12"
              fill="white"
              fontWeight="bold"
            >
              {
                item.value != 0 && `${item.value} ${unit}`
              }
            </Text>
          ))}
        </G>
      </Svg>
    </View>

  )
}


const Graph = () => {

  const { meteogram } = useStateContext()


  let dataTemp = meteogram.forecast.tabular.time.map(elem => ({

    "value": parseFloat(elem.temperature["@_value"]),
    // "precipitation": parseFloat(elem.precipitation["@_value"]),
    // "icon": `https://www.meteobahia.com.ar/imagenes/new/${elem.symbol["@_number"]}.png`,
    // "wind": {
    //   "direction": elem.windDirection["@_code"],
    //   "value": parseFloat(elem.windDirection["@_name"].split(" km/h")[0])
    // },
    "date": new Date(elem["@_from"])

  }))

  let dataRain = meteogram.forecast.tabular.time.map(elem => ({


    "value": parseFloat(elem.precipitation["@_value"]),
    "date": new Date(elem["@_from"])

  }))

  let dates = meteogram.forecast.tabular.time.map(elem => ({


    "value": new Date(elem["@_from"]).getDate(),
    "date": new Date(elem["@_from"])

  }))




  // const data = [
  //   { temperature: 20, date: new Date('2023-09-01') },
  //   { temperature: 18, date: new Date('2023-09-02') },
  //   { temperature: 16, date: new Date('2023-09-03') },
  //   { temperature: 22, date: new Date('2023-09-03') },
  //   { temperature: 23, date: new Date('2023-09-03') },
  //   { temperature: 20, date: new Date('2023-09-03') },
  //   // Más datos
  // ];

  return (
    <ScrollView horizontal>
      <View style={s.container}>
        {
          
        }
        {/* <CustomChart param={"temp"} data={dataTemp} lineColor={"red"} unit={"°"} height={200} />
        <CustomChart param={"rain"} data={dataRain} lineColor={"#0097f3"} unit={"mm"} height={200} />
        <CustomChart param={"time"} data={dates} lineColor={"transparent"} unit={""} height={50} /> */}

      </View>
    </ScrollView>
  )
}




export default Graph


const s = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 7,
    margin: 7,
  },
  chart: {
    padding: 7,
    backgroundColor: colors.card,
  }
})