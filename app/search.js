import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Icon, IconButton, TextInput, TouchableRipple } from 'react-native-paper'
import cities from '../data/cities.json'
import { useRouter } from 'expo-router'
import { saveCity } from '../utils/storage'
import { useStateContext } from '../context/StateProvider'
import { colors } from '../constants/colors'

const SearchPage = () => {
  const { back } = useRouter()
  const {setSelectedCity} = useStateContext()
  const [text, setText] = useState("");
  const [results, setResults] = useState([])
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


  useEffect(() => {
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
        enablesReturnKeyAutomatically
         
        onChangeText={text => setText(text)}
      />

      <ScrollView>
        <View style={s.results}>
          {
            results.map((result, i) => (
              <TouchableRipple
                key={i}
                rippleColor="white"
                style={{ borderRadius: 7 ,backgroundColor: "#246e99",}}
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
    marginTop:3,
    marginBottom:100
  },
  result: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 15,
    
  },
  resultText: {
    fontWeight: "500",
    color: "white",
  }
})