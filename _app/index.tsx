// import { Link } from "expo-router";
// import { ScrollView, Text, View } from "react-native";
// import Constants from "expo-constants";
// import { links } from "@/constants/Others";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from "@react-navigation/native";
// import routes from "@/screens/routes";
// import screens from "@/screens/screens";
// import HomeScreen from "@/screens/HomeScreen";

// const Stack = createNativeStackNavigator();

// export default function Index() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name={routes.Home.link}
//           component={HomeScreen}
//           options={{ title: routes.Home.displayName }}
//         />
//         {screens.map(x =>
//           <Stack.Screen
//             key={x.details.link}
//             name={x.details.link}
//             component={x.component}
//             options={{ title: x.details.displayName }}
//           />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// // export default function Index() {
// //   return (
// //     <ScrollView style={{ flex: 1, padding: 10 }}>
// //       {/* <Text>{Constants.expoConfig?.hostUri?.split(':').shift()}</Text> */}
// //       {links.toReversed().map(x => 
// //         <Link
// //           key={x.id}
// //           href={`./${x.url}`}
// //           style={{
// //             marginBottom: 20,
// //             padding: 10,
// //             width: '100%',
// //             backgroundColor: 'lightgreen'
// //           }}
// //         >{x.displayName}</Link>
// //       )}
// //     </ScrollView>
// //   );
// // }