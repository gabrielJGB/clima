import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon, TouchableRipple } from 'react-native-paper'
import { colors } from 'constants/colors'
import { findMinMaxTemperature, getDropsArray, getIconCode, sumPrecipitation } from '@utils/weather'
import { router } from 'expo-router'
import HourCard from '@components/home/HourCard'

const DayCard = ({ data }) => {

  const { weather, title, date } = data
  const [groups, setGroups] = useState()
  const _date = date.split("T")[0]
  const maxMin = findMinMaxTemperature(weather)
  const precipitation = sumPrecipitation(weather)
  const arr = [

    { time: "06:00", text: "Mañana" },
    { time: "12:00", text: "Mediodía" },
    { time: "15:00", text: "Tarde" },
    { time: "21:00", text: "Noche" }
  ]



  useEffect(() => {

    let groups = []
    arr.forEach((elem, i) => {


      let data = weather.find(item => item["@_from"].split("T")[1] === elem.time)

      if (data != undefined)
        groups.push({
          time: elem.time,
          text: elem.text,
          data
        })
    })

    setGroups(groups);

  }, [])


  if (!groups)
    return <></>


  return (
    <TouchableRipple

      rippleColor={colors.card200}
      onPress={() => router.push(`/day/${_date}`)}
      unstable_pressDelay={80}
      style={{ borderRadius: 12 }}
      borderless
    >


      <View className='flex flex-col gap-2 bg-slate-900/70 p-3 ' >

        <View className='flex flex-col gap-0'>
          <View className='flex flex-row justify-between'>
            <Text className='text-white text-[19px] font-semibold'>{title}</Text>
            <View className='flex flex-row items-center gap-0'>
              {
                getDropsArray(precipitation).map((rain, i) => (
                  <Icon key={i} source="water" size={13} color={rain?'#00b9f1':'#0f2d43'} />
                ))
              }
            </View>
          </View>
          <View className='flex flex-row items-center'>
            <Text className='text-gray-500'><Text className='text-[#ff1f1f] text-[19px] font-semibold'>{Math.round(maxMin.maxTemp.value)}°</Text> / </Text>
            <Text><Text className='text-[#2b8eff] text-[19px] font-semibold'>{Math.round(maxMin.minTemp.value)}°</Text></Text>
          </View> 
        </View>

        <View className='flex flex-row items-center justify-around'>
          {
            groups.map((group, i) => (
              <HourCard key={i} group={group} />
            ))
          }
        </View>

      </View>

    </TouchableRipple>
  )
}

export default DayCard