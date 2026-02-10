import React, { useCallback, useState } from 'react'
import { View, Text, ScrollView, RefreshControl, StatusBar } from 'react-native'
import MainView from '@components/home/MainView'
import SelectionView from '@components/home/SelectionView'
import { Link, useFocusEffect } from 'expo-router'
import { useStateContext } from '@context/StateProvider'
import { getDefaultCityCode } from '@utils/storage'
import { setStatusBarBackgroundColor } from 'expo-status-bar'
import { colors } from 'constants/colors'

const HomeScreen = () => {

  const [loading, setLoading] = useState(true)
  const { selectedCity, setSelectedCity, setRefresh } = useStateContext()


  useFocusEffect(
    useCallback(() => {
      setStatusBarBackgroundColor(colors.background)
      getDefaultCityCode()
        .then(code => setSelectedCity(code != undefined ? code : undefined))
        .finally(() => setLoading(false))

    }, [])

  )

  if (loading)
    return


  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={false} onRefresh={() => {
        setRefresh(prev => prev ? 0 : 1)
      }
      }
      />
    }>
      <View style={{paddingTop:StatusBar.currentHeight}}>

        {
          selectedCity === undefined ?
            <SelectionView />
            :
            <MainView />
        }

      </View>
    </ScrollView>
  )
}

export default HomeScreen