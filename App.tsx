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

axios.defaults.baseURL = backendHead;

const isIOS = Platform.OS === 'ios';

const queryClient = new QueryClient()

setUpRNCalendars();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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