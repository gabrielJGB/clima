import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Linking, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FirstView from "../components/index/FirstView";
import Main from "../components/index/Main";
import { useStateContext } from "../context/StateProvider";
import { PaperProvider, Portal, Snackbar } from "react-native-paper";


export default function Page() {


  const { selectedCity, setSelectedCity, refresh,setRefresh } = useStateContext()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkCity = async () => {

    try {
      const city = await AsyncStorage.getItem('city');


      if (city != null) {

        setSelectedCity(city);
      } else {
        setSelectedCity(false);
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false)
    }

  };

  useEffect(() => {

    checkCity()

  }, [selectedCity])

  if (loading)
    return <></>;


  return (
    <PaperProvider>
      <ScrollView refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => {
          setError(false)
          setRefresh(prev => !prev)} 
        }
          />
      }
      >
        <View style={s.container}>


          {
            selectedCity ?
              <Main />
              :
              <FirstView />
          }


        </View>
        {
          selectedCity &&
          <Text onPress={() => { Linking.openURL("https://www.meteobahia.com.ar") }} style={s.credits}>
            Fuente: <Text style={[s.credits, { textDecorationLine: "underline" }]}> www.meteobahia.com.ar</Text>
          </Text>
        }
      </ScrollView>




    </PaperProvider>
  );
}

const s = StyleSheet.create({
  container: {
    minHeight: Dimensions.get("window").height,
    marginHorizontal: 5,


  },
  credits: {
    fontSize: 16,
    fontWeight: "500",
    width: "100%",
    position: "absolute",
    padding: 7,
    bottom: 0,
    textAlign: "center",
    color: "#007cc9"
  }

});
