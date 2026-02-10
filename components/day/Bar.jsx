import { colors } from "constants/colors"
import { View } from "react-native"

const getBgColor = (value, isRain) => {

  let limits = isRain ? [0, 10, 30, 40, 52, 60] : [0, 23, 32, 39, 55, 60]


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

const Bar = ({ value, parameter }) => {
/**
 *   bar: {
    width: 80,
    height: 3,
    borderRadius: 4,
    backgroundColor: colors.background,
  },
 */
  
  const valueColor = value
  value = value >= 100 ? 100 : value
  value = parameter === "rain" && value > 0 ? (Math.log(value + 1) * (value<50?10:15)) : value

  return (
    <View className="w-[80px] h-[3px] rounded " style={{backgroundColor:colors.background}}>
      <View className="h-[3px] rounded" style={{  width: `${value.toFixed()}%`, backgroundColor: getBgColor(valueColor, parameter === "rain") }}></View>
    </View>
  )
}

export default Bar