import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { formatHeaderDate, formatearFecha } from '../../utils/time'
import { TouchableRipple, Card, Icon } from 'react-native-paper'
import { colors } from '../../constants/colors'
import { useRouter } from 'expo-router'
import { findMinMaxTemperature, getDropsArray, sumPrecipitation } from '../../utils/weather'

const IMG_SIZE = 37

const DayOverview = ({ dayData }) => {

    const { push } = useRouter()
    const [groups, setGroups] = useState(false)
    const maxMin = findMinMaxTemperature(dayData.weather)
    const precipitation = sumPrecipitation(dayData.weather)
    const date = formatHeaderDate(dayData.date.split("T")[0].replaceAll("-","/"))

    const arr = [

        { time: "06:00:00", text: "Mañana" },
        { time: "12:00:00", text: "Mediodía" },
        { time: "15:00:00", text: "Tarde" },
        { time: "21:00:00", text: "Noche" }
    ]


    useEffect(() => {
        // const x = dayData.weather.map((data) => {
        //     return {
        //         weather: data,
        //         title: formatearFecha(data["@attributes"].from),
        //     }
        // })

        // console.log(x);



        let groups = []
        arr.forEach((elem, i) => {
            let data = dayData.weather.find(item => item["@_from"].split("T")[1] === elem.time)
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
            
            rippleColor={"white"}
            onPress={() => push({pathname:"day",params: {forecastString:JSON.stringify(dayData.weather),date }})}
            unstable_pressDelay={80}
            style={{ borderRadius: 12}}
            borderless
        >


            <View style={s.container} >


                <View style={s.header}>
                    <View style={s.headerTop}>
                        <Text style={s.title}>{dayData.title}</Text>
                        <View style={s.drops}>
                            {
                                getDropsArray(precipitation).map((elem, i) => (
                                    <Icon key={i} source="water" size={13} color='#00b9f1' />
                                ))
                            }
                        </View>
                    </View>
                    <View style={s.headerBottom}>
                        <Text style={s.bottomText}>Max: <Text style={s.max}>{maxMin.maxTemp}</Text>°C  </Text>
                        <Text style={s.bottomText}>Min: <Text style={s.min}>{maxMin.minTemp}</Text>°C</Text>
                    </View>
                </View>

                <View style={s.groupContainer}>
                    {
                        groups.map((group, i) => (
                            <View style={s.hour} key={i}>
                                <View style={s.img}>
                                    <Image source={{ uri: `https://www.meteobahia.com.ar/imagenes/new/${group.data.symbol["@_number"]}.png` }} style={s.img} />
                                </View>
                                <Text style={s.temp}>{group.data.temperature["@_value"]}°C</Text>
                                <Text style={s.dayTime}>{group.text}</Text>
                            </View>
                        ))
                    }
                </View>


            </View>
        </TouchableRipple>

    )
}

export default DayOverview

const s = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 10,
        padding: 10,
        borderRadius: 12,
        backgroundColor: colors.card

    },
    header: {
        flexDirection: "column",

    },
    title: {
        fontWeight: "500",
        color: "white",
        fontSize: 18
    },
    hour: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,

    },
    temp: {
        color: "#efefef",
        fontSize: 16,
        fontWeight: "bold",
    },
    groupContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical:6,
    },
    img: {
        width: IMG_SIZE,
        height: IMG_SIZE,
    },
    dayTime: {
        fontSize: 12,
        color: "#b5b5b5"
    },
    headerTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerBottom: {
        fontSize: 12,
        color: "grey",
        flexDirection: "row",
        gap: 7
    },
    min: {
        fontSize: 17,
        fontWeight: "500",
        color: "#00aaff",
    },
    max: {
        fontSize: 17,
        fontWeight: "500",
        color: "#ff0e12"
    },
    bottomText: {
        fontSize: 12,
        color: "grey"
    },
    drops: {
        flexDirection: "row",
        alignItems: "center",
        gap: 0
    }

})