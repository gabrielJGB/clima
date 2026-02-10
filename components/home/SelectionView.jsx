import { View, Text, Image } from 'react-native'
import React from 'react'
import { Button, Icon } from 'react-native-paper'
import background from '@assets/background.png'
import { colors } from 'constants/colors'
import { useRouter } from 'expo-router'



const SelectionView = () => {

    const { push } = useRouter()

    return (
        <View className='h-screen flex-col gap-2 items-center justify-center'>
            <Image source={background} style={{ width: 140, height: 140 }} />
            <Button
                onPress={() => push("search")}
                buttonColor={"black"}
                mode='elevated'
                textColor='white'
                icon={"magnify"}
                
            >
                Buscar una ciudad
                
            </Button>
        </View>
    )
}

export default SelectionView