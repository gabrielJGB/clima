import { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FirstView from "../components/index/FirstView";
import Main from "../components/index/Main";
import { useStateContext } from "../context/StateProvider";
import { removeCity, saveCity } from "../utils/storage";

export default function Page() {


  const { selectedCity, setSelectedCity,setRefresh } = useStateContext()


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const _fetchDummy = async () => {

  //   try {
  //     const result = await fetchDummy();
  //     setData(result);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // const _getSavedCity = async () => {

  //   try {
  //     const res = await getSavedCity()
  //     setSaved(res)

  //   }
  //   catch (error) {
  //     setError(error.message)
  //   }
  // }


  // const _setSavedCity = async (code) => {

  //   try {
  //     const res = await setSavedCity(code)
  //     setSaved(res)

  //   }
  //   catch (error) {
  //     setError(error.message)
  //   }
  // }

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
    // _setSavedCity("pa")

    // _getSavedCity()

    // if (saved != null) {
    //   console.log("guardado: ",saved)
    // }else{
    //   console.log("no hay datos")

    // }



    // // fetch("https://api.allorigins.win/raw?url=https://www.meteobahia.com.ar/jsonp.php?url=https://meteobahia.com.ar/scripts/meteogramas/pa.xml", {


    // fetch("https://api.allorigins.win/raw?url=https://www.meteobahia.com.ar/jsonp.php?url=https://meteobahia.com.ar/scripts/xml/now-9dj.xml", {

    //   "headers": {
    //     "sec-fetch-site": "none",
    //     "sec-fetch-user": "?1",
    //   }

    // })
    //   .then(r => r.text())
    //   .then(t => {
    //     console.log(t.replace("callback","").replace(";","").slice(1, -1))
    //   })

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
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {

    marginHorizontal: 5,
    marginBottom: 100

  },

});
