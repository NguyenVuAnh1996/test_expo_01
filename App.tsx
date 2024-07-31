import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import routes from "./screens/routes";
import HomeScreen from "./screens/HomeScreen";
import screens from "./screens/screens";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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