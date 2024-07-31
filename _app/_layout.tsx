import HomeScreen from "@/app-example/(tabs)";
import { backendHead } from "@/constants/Others";
import routes from "@/screens/routes";
import screens from "@/screens/screens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { Platform, SafeAreaView, StatusBar, Text, View } from "react-native";

axios.defaults.baseURL = backendHead;

const Stack = createNativeStackNavigator();

const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';
const statusBarBGColor = 'lightgreen';

export default function MainLayout() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={routes.Home.link}>
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
    </NavigationContainer>
  )
}