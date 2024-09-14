import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { IconButton } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useStateContext } from '../context/StateProvider'
import { findMinMaxTemperature, sumPrecipitation } from '../utils/weather';
import { BarChart, LineChart } from 'react-native-gifted-charts'
import { formatearFecha } from '../utils/time'
import { Image } from 'expo-image'

const formatDate = (from) => {
    const date = new Date(from)
    const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
    const daysAb = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

    const time = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
    const dateString = `${days[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`
    const dateString2 = `${daysAb[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`

    return { time, dateString2 }

}


const getBgColor = (value) => {

    let limits = [0, 10, 30, 40, 52, 60]


    if (value > limits[0] && value < limits[1])
        return "#00b500"

    else if (value >= limits[1] && value < limits[2])
        return "#abff00"

    else if (value >= limits[2] && value < limits[3])
        return "#FFFF00"

    else if (value >= limits[3] && value < limits[4])
        return "#FFBF00"

    else if (value >= limits[4] && value < limits[5])
        return "#FF8000"

    else if (value >= limits[5])
        return "#FF0000"



}

const ChartPage = () => {
    const { back } = useRouter()
    const { meteogram } = useStateContext()




    // const times = ["00:00:00", "06:00", "09:00", "12:00", "18:00", "21:00"]

    // let x = meteogram.filter(x =>
    //     x["@_from"].includes(times[0]) ||
    //     x["@_from"].includes(times[1]) ||
    //     x["@_from"].includes(times[2]) ||
    //     x["@_from"].includes(times[3]) ||
    //     x["@_from"].includes(times[4]) ||
    //     x["@_from"].includes(times[5])
    // )


    // let dataTemp = x.slice(0, 56).map((elem, i) => {

    //     return {
    //         label: elem["@_from"].includes("00:00:00") ? formatDate(elem["@_from"]).dateString2 : formatDate(elem["@_from"]).time,
    //         // label: i % 2 === 0 ? formatDate(elem["@_from"]) : "",
    //         dataPointText: String(elem.temperature["@_value"]),
    //         value: parseFloat(elem.temperature["@_value"]),
    //         showVerticalLine: elem["@_from"].includes("00:00:00"),
    //         verticalLineColor: "rgba(14,164,164,0.6)",
    //         labelTextStyle: elem["@_from"].includes("00:00:00") ? { fontWeight: "500", fontSize: 13, color: "white" } : null,

    //         // dataPointLabelComponent: () => (
    //         //     <View>
    //         //         {
    //         //             i % 2 === 0 &&
    //         //             <Image source={{ uri: `https://www.meteobahia.com.ar/imagenes/new/${elem.symbol["@_number"]}.png` }} style={s.img} />
    //         //         }
    //         //         <Text style={{ color: "white" }}>{elem.temperature["@_value"]}°</Text>
    //         //     </View>
    //         // )

    //     }
    // })

    // //poner 00:00.00 como bar de 1 width y max height y bg color claro


    // let dataRain = x.slice(0, 56).map((elem, i) => {



    //     return {
    //         label: elem["@_from"].includes("00:00:00") ? formatDate(elem["@_from"]).dateString2 : formatDate(elem["@_from"]).time,
    //         dataPointText: String(elem.precipitation["@_value"]) ,
    //         value: elem["@_from"].includes("00:00:00") ? 70 : parseFloat(elem.precipitation["@_value"]),
    //         labelTextStyle: elem["@_from"].includes("00:00:00") ? { fontWeight: "500", fontSize: 13, color: "white" } : null,
    //         topLabelComponent: elem.precipitation["@_value"] != 0 ? () => <Text style={{ color: "white", fontSize: 10 }}>{elem.precipitation["@_value"]}</Text> : () => <></>,
    //         frontColor:elem["@_from"].includes("00:00:00") ?"rgba(14, 164, 164, 0.6)":"aqua",
    //         barStyle: elem["@_from"].includes("00:00:00") ? {width:2,marginLeft:15}:{width:20},



    //     }
    // })




    const tempData = meteogram.map((elem) => {

        const temp = findMinMaxTemperature(elem)
        const date = formatDate(elem[0]["@_from"]).dateString2

        return {
            max: {
                value: temp.maxTemp.value,
                label: date,
                labelTextStyle: s.graphlabel,
                dataPointText: String(temp.maxTemp.value) + "°",

                dataPointLabelComponent: () => (
                    <View >
                        {

                            <Image source={{ uri: `https://www.meteobahia.com.ar/imagenes/new/${elem[temp.maxTemp.pos].symbol["@_number"]}.png` }} style={s.img} />

                        }
                        <Text style={{ marginLeft: 12, color: "white" }}>{temp.maxTemp.value}°</Text>
                    </View>
                )
            },
            min: {
                value: temp.minTemp.value,
                label: date,
                labelTextStyle: s.graphlabel,
                dataPointText: String(temp.minTemp.value) + "°",
                dataPointLabelComponent: () => (
                    <View>
                        {

                            <Image source={{ uri: `https://www.meteobahia.com.ar/imagenes/new/${elem[temp.minTemp.pos].symbol["@_number"]}.png` }} style={s.img} />

                        }
                        <Text style={{ marginLeft: 12, color: "white" }}>{temp.minTemp.value}°</Text>
                    </View>
                ),

            }
        }
    })



    const rainData = meteogram.map((elem) => {

        const mm = sumPrecipitation(elem)
        const date = formatDate(elem[0]["@_from"]).dateString2

        return {
            value: mm < 1 && mm != 0 ? 2 : mm,
            label: date,
            frontColor: getBgColor(mm),
            topLabelComponent: () => (
                <Text style={{ color: 'lightgrey', fontSize: 11, marginBottom: 3 }}>{mm != 0.00 ? mm.toFixed(1) : "0"}</Text>
            ),

        }
    })


    tempData.pop()
    rainData.pop()

    const  maxValue = Math.max(...rainData.map(x=>x.value))




    return (
        <View>
            <View style={s.header}>
                <IconButton icon="arrow-left" iconColor="white" size={22} onPress={() => back()} />
                <Text style={s.headerText}>Meteograma</Text>

            </View>

            <ScrollView horizontal>
                <View style={s.container}>
                    <View style={{ marginHorizontal: 12, borderRadius: 16, padding: 12, backgroundColor: colors.card }}>
                        <Text style={s.title}>Temperatura (°C)</Text>
                        <View style={s.textContainer}>
                            <View style={s.box}>
                                <View style={[s.dot, { backgroundColor: '#ff3b3b' }]}></View>
                                <Text style={s.text}>Máxima</Text>
                            </View>

                            <View style={s.box}>
                                <View style={[s.dot, { backgroundColor: '#5ad7ff' }]}></View>
                                <Text style={s.text}>Mínima</Text>
                            </View>
                        </View>
                        <LineChart


                            isAnimated
                            animationDuration={800}


                            initialSpacing={32}
                            spacing={90}
                            data={tempData.map(e => e.max)}
                            data2={tempData.map(e => e.min)}
                            curved
                            curvature={0.2}
                            mostNegativeValue={-6}
                            textColor='white'
                            textColor1="white"
                            textShiftY={-6}
                            textShiftX={-6}
                            textFontSize={14}
                            thickness={2}
                            rulesColor={colors.background}
                            showVerticalLines
                            verticalLinesColor="rgba(14,164,164,0.3)"
                            xAxisLabelTextStyle={{ color: "white", fontSize: 11 }}
                            yAxisColor="rgba(14,164,164,0.5)"
                            xAxisColor="rgba(14,164,164,0.5)"
                            yAxisTextStyle={{ color: "grey", fontSize: 12 }}
                            color1="#ff3b3b"
                            color2='#5ad7ff'
                            dataPointsColor='#ff3b3b'
                            dataPointsColor2='#5ad7ff'
                            height={180}


                        />
                    </View>

                    <View style={{ marginHorizontal: 12, borderRadius: 16, padding: 12, backgroundColor: colors.card }}>
                        <Text style={s.title}>Precipitación (mm)</Text>
                        <BarChart
                            data={rainData}
                            maxValue={maxValue>60?maxValue+20:80}
                            frontColor="#177AD5"
                            yAxisTextStyle={{ color: "grey", fontSize: 12 }}
                            xAxisLabelTextStyle={{ color: "white", fontSize: 11 }}
                            xAxisColor="rgba(14,164,164,0.5)"
                            yAxisColor="rgba(14,164,164,0.5)"
                            rulesColor={colors.background}
                            verticalLinesColor="rgba(14,164,164,0.3)"
                            showVerticalLines
                            height={150}
                            initialSpacing={15}
                            barBorderRadius={2}
                            spacing={60}


                        />
                    </View>
                </View>
            </ScrollView>


        </View>
    )
}

export default ChartPage

const s = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        backgroundColor: colors.card
    },
    headerText: {
        color: "white",
        fontWeight: "500",
    },
    title: {
        color: "white",
        fontSize: 18,
        marginBottom: 8,
        paddingLeft: 7,
        fontWeight: "500",
    },
    container: {
        flexDirection: "column",
        gap: 20,
        marginTop: 20,
    },
    img: {

        width: 18,
        height: 18,
    },
    textContainer: {
        flexDirection: "column",
        marginLeft: 12,
        marginBottom: 5
    },
    box: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    text: {
        color: "white",
        fontSize: 12,
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 2
    },
    graphlabel: {
        fontSize: 11,
        color: "white",
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: -1 },
        textShadowRadius: 2,
    }
})