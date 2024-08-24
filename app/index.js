import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FirstView from "../components/index/FirstView";
import Main from "../components/index/Main";
import { useStateContext } from "../context/StateProvider";
import { removeCity, saveCity } from "../utils/storage";

export default function Page() {


  const { selectedCity, setSelectedCity,setRefresh } = useStateContext()
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
    return <ActivityIndicator size="large" color="white" />;


  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={false} onRefresh={()=>setRefresh(prev=>!prev)} />
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
          <Text style={s.credits}>{"Fuente: www.meteobahia.com.ar"}</Text>
      }
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    minHeight:Dimensions.get("window").height,
    marginHorizontal: 5,
    

  },
  credits:{
    fontSize:13,
    fontWeight:"500",
    width:"100%",
    position:"absolute",
    bottom:5,
    textAlign:"center",
    color:"#303435"
  }

});
