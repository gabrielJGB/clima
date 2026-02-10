import React from 'react'
import { ScrollView, StatusBar, Text, View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, IconButton } from 'react-native-paper'
import HourCard from '@components/day/HourCard';
import { useStateContext } from '@context/StateProvider';
import { formatHeaderDate, formatHeaderDate2 } from '@utils/time'
import { colors } from 'constants/colors';


const DayScreen = () => {

  const { date } = useLocalSearchParams();
  const { forecastArray } = useStateContext()
  const dateForecast = forecastArray[date]
  const { replace } = useRouter()
  const keys = Object.keys(forecastArray)
  const index = keys.indexOf(date)
  const prev = index - 1
  const next = index + 1
  const ICON_SIZE = 35
  const ICON_COLOR = "white"

  return (
    <ScrollView>

      <View className='flex flex-col gap-1 m-2 pb-5' style={{paddingTop:StatusBar.currentHeight}}>

        <View className='flex flex-row items-center justify-between w-full '>

          <IconButton
            icon="chevron-left"
            disabled={prev < 0}
            iconColor={ICON_COLOR}
            size={ICON_SIZE}
            onPress={() => {
              replace(`/day/${keys[prev]}`)
            }} />

          <Text className="py-0 text-center text-[20px] text-white font-semibold">
            {formatHeaderDate(date.replaceAll("-", "/"), false)}
          </Text>

          <IconButton
            icon="chevron-right"
            disabled={next > keys.length - 1}
            iconColor={ICON_COLOR}
            size={ICON_SIZE}
            onPress={() => {
              replace(`/day/${keys[next]}`)
            }} />

        </View>



        <View className='flex flex-row justify-center flex-wrap gap-2'>
          {
            keys.map((_date, i) => (
              <Button
                key={i}
                textColor={_date === date ? "black" : "white"}
                buttonColor={_date === date ? "white" : colors.card}
                onPress={() => { replace(`day/${_date}`) }}
                compact
                style={{ borderRadius: 8, maxWidth:70,flexGrow:1 }}
                contentStyle={{ borderRadius: 0 }}
                rippleColor="white"
              >

                <Text className=' text-center' >{formatHeaderDate2(_date.replaceAll("-", "/"))}</Text>

              </Button>
            ))
          }
        </View>

        <View className='flex flex-col gap-1 mt-4' style={{ marginTop: 10 }}>

          {
            dateForecast.map((item, i) => (
              <HourCard key={i} data={item} />
            ))
          }

        </View>
      </View>
    </ScrollView>
  )
}

export default DayScreen

