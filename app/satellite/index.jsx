import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, IconButton } from 'react-native-paper'
import { colors } from 'constants/colors'
import { useNavigation, useRouter } from 'expo-router'
import { WebView } from 'react-native-webview'
import { setStatusBarBackgroundColor } from 'expo-status-bar'


const SatellitePage = () => {

    const options = [
        {
            name: "Infrarrojo",
            url: "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/SECTOR/SSA/13/GOES16-SSA-13-900x540.gif"
        },
        {
            name: "Visible",
            url: "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/SECTOR/ssa/02/GOES16-SSA-02-900x540.gif"
        },
        {
            name: "Relámpagos",
            url: "https://cdn.star.nesdis.noaa.gov/GOES16/GLM/SECTOR/ssa/EXTENT3/GOES16-SSA-EXTENT3-900x540.gif"
        }

    ]

    const { back, } = useRouter()
    const { setOptions } = useNavigation()
    const [selectedOption, setSelectedOption] = useState(0)

    const htmlContent = `
    <html>
        <header>
            <meta name="viewport" content="width=device-width, initial-scale=1.4, user-scalable=yes">
            <style>*{padding:0;margin:0}</style>
        </header>
        <body style="background-color:${colors.background};padding-top:100px">
            <img src="${options[selectedOption].url}" typeof='image/gif' width="${Dimensions.get("window").width}"/>
        <body>
    <html>
    `

    useEffect(() => {
      setStatusBarBackgroundColor(colors.card)
    }, [])
    

    return (
        <View style={{paddingTop:StatusBar.currentHeight}}>
            <View style={s.header}>
                <IconButton icon="arrow-left" iconColor="white" size={22} onPress={() => back("/")} />
                <Text style={s.headerText}>Imágenes satelitales</Text>

            </View>


            <View style={s.buttons}>

                {
                    options.map((option, i) => (
                        <Button
                            key={i}
                            buttonColor={"#001d33"}
                            textColor='white'
                            style={{ borderBottomWidth: 3, borderBottomColor: selectedOption ===i? "#ffff" : "transparent", borderRadius: 0, width: "33.3%" }}
                            onPress={() => setSelectedOption(i)}
                        >{option.name}</Button>
                    ))
                }

            </View>

            <View style={{ height: "89%", width: "100%" }}>
                <WebView
                    originWhitelist={['*']}
                    source={{ html: htmlContent }}
                />
            </View>


        </View>
    )
}

export default SatellitePage

const s = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 0,
        backgroundColor: colors.card
    },
    headerText: {
        color: colors.text,
        fontWeight: "500"
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: colors.card
    },
    img: {
        heigth: "80%",
        width: "100%"
    }
})