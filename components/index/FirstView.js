import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import logo from '../../assets/background.png'
import { useRouter } from 'expo-router'
import { colors } from '../../constants/colors'

const FirstView = () => {

    const { push } = useRouter()

    return (
        <View style={s.container}>

            <Image source={logo} style={s.img} />
            <Button
                onPress={() => push("search")}
                buttonColor={colors.card}
                mode='elevated'
                textColor='white'
                contentStyle={s.buttonContent}
                style={s.button}
            >
                Buscar una ciudad 
            </Button>
        </View>
    )
}

export default FirstView

const s = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop:150
    },
    buttonContent: {
        padding: 7,
    },
    button: {
        borderRadius: 7,
        elevation:2
    },
    img: {
        width: 200,
        height: 200,
    }
})