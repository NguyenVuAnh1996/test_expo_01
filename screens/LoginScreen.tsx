import AsyncStorage from "@react-native-async-storage/async-storage";
import routes from "./routes";
import { jwtDecode } from "jwt-decode";
import useQuerySimplified from "@/hooks/useQuerySimplified";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Pressable, ScrollView, Text } from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInputRHF from "@/components/main/forms/TextInputRHF";
import { validateEmail } from "@/lib/utils";
import { useTryCatchPending } from "@/hooks/useTryCatchPending";
import { getNotiToken } from "@/lib/notifications";
import axios from "axios";
import { authenTokenName, keyForGettingAuthenToken } from "@/constants/Others";

interface LoginEntity {
  email: string
  password: string
  notiToken: string
}

export default function LoginScreen({ navigation }: NativeStackScreenProps<any>) {
  const [result, setResult] = useState<string>('');

  const getAuthenToken = async () => {
    let token = await AsyncStorage.getItem(authenTokenName);
    if (token) {
      navigation.navigate(routes.TestUser.link);
    }
    return token;
  }
  const [isLoading, startGettingAuthenToken] = useQuerySimplified(getAuthenToken, keyForGettingAuthenToken);

  useEffect(() => {
    startGettingAuthenToken((err: any) => {
      console.log(JSON.stringify(err))
    });
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<LoginEntity>();

  const [isLogging, startLogging] = useTryCatchPending();

  const onSubmit: SubmitHandler<LoginEntity> = data => {
    startLogging(
      async () => {
        const notiToken = await getNotiToken();
        if (!notiToken) {
          setResult('Log in error: Noti token not found!')
          return;
        }
        data.notiToken = notiToken;
        const res = await axios.post('api/auth/login', data);
        const authenToken: string = res.data.access_token;
        await AsyncStorage.setItem('auth-token', authenToken);
        navigation.navigate(routes.Home.link);
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
      <Text style={{
        textAlign: 'center',
      }}>Vui lòng đăng nhập</Text>
      <TextInputRHF
        control={control}
        name="email"
        errors={errors}
        isRequired
        isLabel
        displayName="Email"
        extraValidate={value => validateEmail(value)}
        errMess_extra="Phải đúng định dạng email"
        style={{
          height: 40,
          padding: 10,
        }}
        labelStyles={{
          marginTop: 20
        }}
      />
      <TextInputRHF
        control={control}
        name="password"
        errors={errors}
        isRequired
        isLabel
        displayName="Mật khẩu"
        style={{
          height: 40,
          padding: 10,
        }}
        labelStyles={{
          marginTop: 20
        }}
      />
      <Pressable onPress={handleSubmit(onSubmit)} style={{
        padding: 15,
        margin: 'auto',
        marginTop: 20,
        backgroundColor: 'salmon',
        borderRadius: 15,
        opacity: isLogging ? 0.7 : 1
      }} disabled={isLogging}>
        <Text>{isLogging ? '...' : 'Đăng nhập'}</Text>
      </Pressable>
      <Text style={{ color: 'red' }}>{result}</Text>
    </ScrollView>
  )
}