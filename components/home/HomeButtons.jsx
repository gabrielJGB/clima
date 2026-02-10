import { View, Text } from 'react-native'
import React from 'react'
import { Icon, TouchableRipple } from 'react-native-paper'
import { colors } from 'constants/colors'
import { useRouter } from 'expo-router'

const HomeButtons = () => {

    const { push } = useRouter()

    return (
        <View className='flex flex-col gap-2'>
            <TouchableRipple rippleColor={colors.card200} borderless unstable_pressDelay={80} style={{ borderRadius: 12 }} onPress={() => push("satellite")}>
                <View style={{ backgroundColor: colors.card, borderRadius: 12, paddingVertical: 11, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Icon source="space-station" color="white" size={22} />
                    <Text style={{ color: "white", fontSize: 13 }}>Imágenes satelitales</Text>
                </View>
            </TouchableRipple>

            <TouchableRipple rippleColor={colors.card200} borderless unstable_pressDelay={80} style={{ borderRadius: 12 }} onPress={() => push({
                pathname: "chart"
            })}
            >
                <View style={{ backgroundColor: colors.card, borderRadius: 12, paddingVertical: 11, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Icon source="chart-timeline-variant" color="white" size={22} />
                    <Text style={{ color: "white", fontSize: 13 }}>Meteograma</Text>
                </View>
            </TouchableRipple>
        </View>
    )
}

export default HomeButtons