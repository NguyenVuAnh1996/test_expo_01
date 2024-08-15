import { Colors } from "@/constants/Colors";
import routes from "@/screens/routes";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";
import Svg, { Path } from 'react-native-svg';

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
      <View style={{ flex: 3, alignItems: 'flex-end', }}>
        <Pressable style={{
          marginRight: 10,
          padding: 10,
        }} onPress={() => navigation.push(routes.TestUser.link)}>
          <UserIcon />
        </Pressable>
      </View>
    </View>
  )
}

const UserIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none"
  // xmlns="http://www.w3.org/2000/svg"
  >
    <Path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="#818181" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <Path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="#818181" stroke-width="1.5" />
  </Svg>
)