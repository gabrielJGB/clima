import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router'
import { ActivityIndicator, Divider, IconButton } from 'react-native-paper'
import { colors } from '../constants/colors'
import HourlyForecast from '../components/HourlyForecast'



const Day = () => {
  const { back } = useRouter()
  const { forecastString,date } = useLocalSearchParams()

  const forecast = JSON.parse(forecastString)

  

  if (!forecast)
    return <ActivityIndicator size="large" color="white" style={{ marginTop: 50 }} />;

  return (
    <View >
      <View style={s.header}>
        <IconButton icon="arrow-left" iconColor="white" size={22} onPress={() => back()} />
        <Text style={s.headerText}>{date}</Text>

      </View>

      <ScrollView>
        <View style={s.container}>

          {
            forecast.map((data, i) => (
              < View key={i}>
                <HourlyForecast data={data} />
                {
                  i < forecast.length-1 &&
                  <Divider style={{backgroundColor:colors.card100,height:1}}  />
                }
              </View>
            ))
          }

        </View>
      </ScrollView>
    </View>
  )
}

export default Day

const s = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 1,
    marginTop: 12,
    marginHorizontal: 7,
    marginBottom:200,
    borderRadius: 12,
    backgroundColor: colors.card

  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#0f0f0f"

  },
  headerText: {
    fontSize:16,
    color: colors.text,
    fontWeight: "500"
  }
})