import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import routes from "./screens/routes";
import HomeScreen from "./screens/HomeScreen";
import screens from "./screens/screens";
import { Platform, Pressable, SafeAreaView, StatusBar, Text, View } from "react-native";
import axios from "axios";
import { backendHead } from "./constants/Others";
import CustomHeader from "./components/main/CustomHeader";
import { Colors } from "./constants/Colors";
import Constants from 'expo-constants';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import setUpRNCalendars from "./components/main/task-calendar/RNCalendarsConfig";
import { setGlobalProps } from "./lib/globalProps";
import { useFonts } from "expo-font";
import notiLinkingConfig from "./components/main/noti/notiLinkingConfigs";
import * as Notifications from 'expo-notifications';
import useInitialNoti from "./components/main/noti/useInitialNoti";

axios.defaults.baseURL = backendHead;

const isIOS = Platform.OS === 'ios';

const queryClient = new QueryClient()

setUpRNCalendars();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [ notificationListener, responseListener ] = useInitialNoti();

  const [fontLoaded, fontErr] = useFonts({
    'Inconsolata': require('@/assets/fonts/Inconsolata-VariableFont_wdth,wght.ttf'),
    'Roboto': 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
  });
  if (!fontLoaded || fontErr) return <></>
  setGlobalProps();
  
  return (
    <NavigationContainer
      linking={notiLinkingConfig}
    >
      <StatusBar backgroundColor={Colors.default.header} barStyle='dark-content' />
      {isIOS &&
        <View style={{
          width: '100%',
          height: Constants.statusBarHeight,
          backgroundColor: Colors.default.header
        }}></View>
      }
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1 }}>
          <RouteStacks />
        </SafeAreaView>
      </QueryClientProvider>
    </NavigationContainer>
  )
}

const RouteStacks = () => (
  <Stack.Navigator
    screenOptions={{
      header: CustomHeader
    }}
  >
    <Stack.Screen
      name={routes.Home.link}
      component={HomeScreen}
      options={{ title: routes.Home.displayName }}
    />
    {screens.map(x =>
      <Stack.Screen
        key={x.details.link}
        name={x.details.link}
        component={x.component}
        options={{ title: x.details.displayName }}
      />
    )}
  </Stack.Navigator>
)