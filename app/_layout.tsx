import { backendHead } from "@/constants/Others";
import axios from "axios";
import { Link, Slot, usePathname } from "expo-router";
import { StatusBar, Text, View } from "react-native";
import Constants from 'expo-constants';

axios.defaults.baseURL = backendHead;

export default function MainLayout() {
  const currentRoute = usePathname();
  return (
    <>
      <StatusBar />
      <View style={{
        height: Constants.statusBarHeight,
        backgroundColor: 'lightgreen'
      }}></View>
      {currentRoute !== '/' &&
        <Link href='/' style={{
          margin: 20,
          backgroundColor: 'lightgrey',
          width: '30%',
          padding: 10
        }}>{`<<< BACK <<<`}</Link>
      }
      <Slot />
    </>
  )
}