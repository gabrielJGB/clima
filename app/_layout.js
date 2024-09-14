import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { ThemeProvider } from '@react-navigation/native'
import MyTheme from '../constants/MyTheme'
import { StateProvider } from '../context/StateProvider'
import { colors } from '../constants/colors'


const Layout = () => {
    const [selectedCity, setSelectedCity] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [meteogram, setMeteogram] = useState(false);

    return (

        <StateProvider value={{ selectedCity, setSelectedCity, refresh, setRefresh,meteogram, setMeteogram }}>
            <ThemeProvider value={MyTheme}>
                <StatusBar />
                <Stack
                    screenOptions={{
                        animation: "slide_from_right",
                        headerShown: false,
                        statusBarColor: colors.background,
                    }}
                    
                >

                    <Stack.Screen name='index'/>
                    <Stack.Screen name='search'  options={{statusBarColor:colors.card}}/>
                    <Stack.Screen name='satellite' options={{statusBarColor:colors.card}}/>
                    <Stack.Screen name='day' options={{statusBarColor:colors.card}}/>
                    <Stack.Screen name='chart' options={{statusBarColor:colors.card}}/>

                </Stack>
            </ThemeProvider>
        </StateProvider>
    )
}

export default Layout

const styles = StyleSheet.create({})