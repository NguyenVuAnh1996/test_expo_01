import { Colors } from "@/constants/Colors";
import routes from "@/screens/routes";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";

export default function CustomHeader({
  navigation,
  route,
  options
}: NativeStackHeaderProps) {
  return (
    <View style={{
      width: '100%',
      height: 50,
      backgroundColor: Colors.default.header,
      flexDirection: 'row'
    }}>
      <View style={{
        flex: 3,
        justifyContent: 'center',
      }}>
        {route.name !== routes.Home.link &&
          <Pressable style={{
            marginLeft: 20
          }} onPress={() => navigation.push(routes.Home.link)}>
            <Text style={{
              fontSize: 20,
            }}>{'<<<'}</Text>
          </Pressable>
        }
      </View>
      <View style={{
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold'
        }}>{options.title}</Text>
      </View>
      <View style={{ flex: 3 }}></View>
    </View>
  )
}