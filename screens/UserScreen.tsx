import useQuerySimplified from "@/hooks/useQuerySimplified";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import routes from "./routes";
import { jwtDecode } from "jwt-decode";
import { Pressable, ScrollView, Text } from "react-native";
import { useTryCatchPending } from "@/hooks/useTryCatchPending";
import axios from "axios";
import { getNotiToken } from "@/lib/notifications";
import { authenTokenName, keyForGettingAuthenToken } from "@/constants/Others";

export default function UserScreen({ navigation }: NativeStackScreenProps<any>) {
  const [result, setResult] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);

  const getAuthenToken = async () => {
    let token = await AsyncStorage.getItem(authenTokenName);
    if (!token) {
      navigation.navigate(routes.Login.link);
      return token;
    }
    const decodedToken = jwtDecode(token);
    // decodedToken = { sub: userid, email: user_email, iat, exp }
    const _userId = Number(decodedToken?.sub);
    if (!isNaN(_userId)) setUserId(_userId);
    setResult(JSON.stringify(decodedToken));
    return token;
  }
  const [isLoading, startGettingAuthenToken] = useQuerySimplified(getAuthenToken, keyForGettingAuthenToken);

  useEffect(() => {
    startGettingAuthenToken((err: any) => {
      setResult(JSON.stringify(err))
    });
  }, []);

  const [isLoggingOut, startLoggingOut] = useTryCatchPending();

  const handleLogout = () => {
    startLoggingOut(
      async () => {
        const notiToken = await getNotiToken();
        if (!notiToken) {
          setResult('Log out error: Noti token not found!')
          return;
        }
        const res = await axios.post('api/auth/logout', {
          userId,
          notiToken
        });
        await AsyncStorage.setItem(authenTokenName, '');
        navigation.navigate(routes.Login.link);
      },
      (err: any) => {
        setResult(JSON.stringify(err))
      }
    )
  }

  if (isLoading) {
    return <></>
  }

  return (
    <ScrollView style={{
      flex: 1,
      padding: 10
    }}>
      <Text>{result}</Text>
      <Pressable onPress={handleLogout} style={{
        padding: 15,
        margin: 'auto',
        marginTop: 20,
        backgroundColor: 'salmon',
        borderRadius: 15,
        opacity: isLoggingOut ? 0.7 : 1
      }} disabled={isLoggingOut}>
        <Text>{isLoggingOut ? '...' : 'Đăng xuất'}</Text>
      </Pressable>
    </ScrollView>
  )
}