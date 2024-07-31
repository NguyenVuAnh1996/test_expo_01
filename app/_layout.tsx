import { backendHead, links } from "@/constants/Others";
import axios from "axios";
import { Link, Slot, usePathname } from "expo-router";
import { Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import Constants from 'expo-constants';
import { useEffect } from "react";

axios.defaults.baseURL = backendHead;

const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';
const statusBarBGColor = 'lightgreen';

export default function MainLayout() {

  useEffect(() => {
    if (isAndroid) {
      StatusBar.setTranslucent(false);
      StatusBar.setBackgroundColor(statusBarBGColor);
    }
  }, [])
  return (
    <>
      <StatusBar />
      {/* {isIOS &&
        <View style={{
          height: Constants.statusBarHeight,
          backgroundColor: statusBarBGColor
        }}></View>
      } */}
      <SafeAreaView style={{flex: 1}}>
        <Header />
        <Slot />
      </SafeAreaView>
    </>
  )
}

const Header = () => {
  const currentRoute = usePathname();
  let displayName = links.filter(x => `/${x.url}` === currentRoute)[0]?.displayName;
  displayName = displayName ? displayName : ''
  return (
    <View style={{
      width: '100%',
      flexDirection: 'row',
      backgroundColor: statusBarBGColor
    }}>
      <View style={{
        flex: 3,
        justifyContent: 'center',
      }}>
        {currentRoute !== '/' &&
          <Link href='/' style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 20
          }}>{`<<<`}</Link>
        }
      </View>
      <View style={{
        flex: 6,
        padding: 15,
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center'
        }}>{
            currentRoute === '/'
              ? 'Trang chủ'
              : displayName
          }</Text>
      </View>
      <View style={{ flex: 3 }}></View>
    </View>
  )
}