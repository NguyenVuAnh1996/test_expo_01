import { Pressable, ScrollView, Text } from "react-native"
import screens from "./screens"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"

const NavBtn = ({ 
  navigation,
  screenName,
  displayName
 }: {
  navigation: NativeStackNavigationProp<any, string, undefined>,
  screenName: string,
  displayName: string
}) => (
  <Pressable 
    onPress={() => navigation.navigate(screenName)}
    style={{
      width: '100%',
      height: 60,
      marginBottom: 20,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Text>{displayName}</Text>
  </Pressable>
)

export default function HomeScreen({ navigation }: NativeStackScreenProps<any>) {
  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      {screens.toReversed().map(x => 
        <NavBtn 
          key={x.details.link}
          screenName={x.details.link}
          displayName={x.details.displayName}
          navigation={navigation}
        />
      )}
    </ScrollView>
  )
}