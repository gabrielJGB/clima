import { Dimensions, StyleSheet, View } from "react-native";
import { G, Polyline, Svg, Text } from "react-native-svg";
import { colors } from "../constants/colors";

const Meteogram = ({ data, lineColor, unit, param, height }) => {
    const { width } = Dimensions.get('window');
  
    // Obtener el rango de temperaturas
    const values = data.map(item => item.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
  
    // Escalado de puntos
    const scaleX =width/12;
    const scaleY = param === "time" ? 10 : (height - 2) / (maxValue - minValue);
    
  
  
    // Crear los puntos para el Polyline
    const points = data.map((item, index) => {
      const x = index * scaleX;
      const y = param === "time" ? 10 : ((maxValue - item.value) * scaleY); // Invertir para que mayor temp esté arriba
      return `${x},${y}`;
    }).join(' ');
  
    return (
  
      <View style={s.chart}>
        <Svg height={height} width={width/1.5} style={{ backgroundColor: colors.card }}>
          {/* Polyline para el gráfico */}
          <G>
            <Polyline
              points={points}
              fill="none"
              stroke={lineColor}
              strokeWidth="2"
            />
  
            {/* Etiquetas de temperatura */}
            {data.map((item, index) => (
              <Text
                key={index}
                x={index * scaleX}
                y={param === "time" ? 10 : (maxValue - item.value) * scaleY + (param === "temp" ? 10 : -4)} // Ajuste de posición
                lengthAdjust='spacing'
                fontSize="12"
                fill="white"
                fontWeight="bold"
              >
                {
                  item.value != 0 && `${item.value} ${unit}`
                }
              </Text>
            ))}
          </G>
        </Svg>
      </View>
  
    )
  }

export default Meteogram

  const s = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        backgroundColor: colors.card
    },
    headerText: {
        color: colors.text,
        fontWeight: "500"
    },
    chart:{
        borderWidth:2,
        borderColor:"grey"
    }
})