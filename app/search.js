import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Icon, IconButton, TextInput, TouchableRipple } from 'react-native-paper'
import cities from '../data/cities.json'
import { useRouter } from 'expo-router'
import { getCityCodes, saveCity } from '../utils/storage'
import { useStateContext } from '../context/StateProvider'
import { colors } from '../constants/colors'


const SearchPage = () => {
  const { back } = useRouter()
  const { setSelectedCity } = useStateContext()
  const [text, setText] = useState("");
  const [results, setResults] = useState([])
  const [cityCodes, setCityCodes] = useState(false)
  const textInput = useRef()


  useEffect(() => {

    if (text != "") {

      let resp = cities.filter(city => {
        let city_lower = city.nombre.toLowerCase()
        if (city_lower.includes(text)) {
          return city
        }
      })

      setResults(resp)
    } else {
      setResults([])
    }

  }, [text])


  const _getCityCodes = async () => {
    const codes = await getCityCodes()

    let arr = codes.map((code) => {
      return cities.find(city => city.code === code)
    })

    setCityCodes(arr)
  }

  useEffect(() => {

    _getCityCodes()
    textInput.current.focus()
  }, [])


  return (
    <View style={s.container}>

      <TextInput
        ref={textInput}
        label="Buscar una ciudad"
        value={text.toLowerCase()}
        activeUnderlineColor="grey"
        left={<TextInput.Icon icon="arrow-left" color="grey" onPress={() => back()} />}
        style={{ backgroundColor: colors.card }}
        textColor='white'
        placeholderTextColor='grey'
        onChangeText={text => setText(text)}

      />

      <ScrollView >
        <View style={s.results}>
          {
            results.length > 0 ?
              results.map((result, i) => (
                <TouchableRipple
                  key={i}
                  rippleColor="white"
                  unstable_pressDelay={80}
                  borderless
                  style={{ borderRadius: 7 }}
                  onPress={() => {
                    saveCity(result.code)
                    setSelectedCity(result.code)
                    back()
                  }}

                >
                  <View style={s.result}>
                    <Icon source="map-marker" color='white' size={18} />

                    <Text numberOfLines={1} style={s.resultText}>{result.nombre}, {result.provincia}</Text>
                  </View>

                </TouchableRipple>
              ))
              :
              <>
                {
                  cityCodes && cityCodes.length > 0 ?
                    <View style={[s.results, { padding: 0 }]}>
                      <Text style={s.title}>Guardados: </Text>
                      {
                        cityCodes.map((item, i) => (
                          <TouchableRipple
                            key={i}
                            rippleColor="white"
                            unstable_pressDelay={80}
                            borderless
                            style={{ borderRadius: 7 }}
                            onPress={() => {
                              saveCity(item.code)
                              setSelectedCity(item.code)
                              back()
                            }}

                          >
                            <View style={s.result}>
                              <Icon source="map-marker" color='white' size={18} />

                              <Text numberOfLines={1} style={s.resultText}>{item.nombre}, {item.provincia}</Text>
                            </View>

                          </TouchableRipple>
                        ))
                      }

                    </View> : <></>
                }
              </>
          }
        </View>
      </ScrollView>



    </View>
  )
}

export default SearchPage

const s = StyleSheet.create({
  container: {
    flexDirection: "column",


  },
  results: {
    padding: 7,
    flexDirection: "column",
    gap: 9,
    marginTop: 3,
    marginBottom: 100
  },
  result: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card200,
    gap: 7,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 15,

  },
  resultText: {
    fontWeight: "500",
    color: "white",
  },
  title: {
    color: "white",
    fontWeight: "500",
    fontSize: 15

  }
})