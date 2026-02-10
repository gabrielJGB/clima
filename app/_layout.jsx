import '../global.css'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { ThemeProvider } from '@react-navigation/native'
import Theme from '../constants/MyTheme'
import { StateProvider } from '../context/StateProvider'
import { colors } from 'constants/colors'
import { StatusBar } from 'react-native'


const Layout = () => {

    const [selectedCity, setSelectedCity] = useState(undefined)
    const [forecastArray, setForecastArray] = useState(undefined)
    const [refresh, setRefresh] = useState(undefined)
    const [meteogram, setMeteogram] = useState(undefined)
    const [sun, setSun] = useState(false)

    return (
        <StateProvider value={{
            selectedCity, setSelectedCity,
            forecastArray, setForecastArray,
            meteogram, setMeteogram,
            refresh, setRefresh,
            sun, setSun
        }}>
            <ThemeProvider value={Theme}>
                
                    <StatusBar translucent={false} backgroundColor="#003353" barStyle="default" />
                    <Stack

                        screenOptions={{
                            animation: "slide_from_right",
                            statusBarColor: colors.background,
                            headerShown: false,

                        }}

                    >
                        <Stack.Screen name='index' />
                        <Stack.Screen name='day/[date]' />
                        <Stack.Screen name='search/index' />
                        <Stack.Screen name='chart/index' />
                        <Stack.Screen name='satellite/index' />

                    </Stack>
                
            </ThemeProvider>

        </StateProvider>

    )
}

export default Layout
