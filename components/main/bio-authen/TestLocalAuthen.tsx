import { useState } from "react"
import { Pressable, Text } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';

interface AuthenTypesCompound {
  [propName: string]: {
    sysValue: number,
    vnName: string
  }
}

const authenTypes: AuthenTypesCompound = {
  FINGERPRINT: {
    sysValue: LocalAuthentication.AuthenticationType.FINGERPRINT,
    vnName: 'Vân tay'
  },
  FACIAL: {
    sysValue: LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
    vnName: 'Khuôn mặt'
  },
  IRIS: {
    sysValue: LocalAuthentication.AuthenticationType.IRIS,
    vnName: 'Con ngươi'
  }
}

export default function TestLocalAuthen() {
  const [text, setText] = useState<string>('Waiting ...');
  const [isChecking, setIsChecking] = useState<boolean>(false);

  const authen = async () => {
    setIsChecking(prev => true);

    let result = await LocalAuthentication.authenticateAsync({
      biometricsSecurityLevel: 'strong'
    });
    setIsChecking(prev => false);
    if (result && result.success) {
      setText('Authen success')
    } else {
      setText('Authen failed')
    }
  }

  const findAuthenTypes = async () => {
    setIsChecking(prev => true);
    let _text = '';
    let isEnrolled = await LocalAuthentication.isEnrolledAsync();
    _text += `is enrolled: ${isEnrolled};\n`;
    let enrollLevel = await LocalAuthentication.getEnrolledLevelAsync();
    _text += `enroll level: ${enrollLevel};\n`;
    let hardwareAsync = await LocalAuthentication.hasHardwareAsync();
    _text += `hardware: ${hardwareAsync};\n`;
    let types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    let allTypes = Object.entries(authenTypes).map(x => x[1])
    let _types: string = types.map(x => 
      allTypes.filter(y => y.sysValue === x)[0].vnName
    ).join(', ');
    _text += `types: ${_types};\n`;
    setIsChecking(prev => false);
    setText(_text);
  }

  return (
    <>
      <Pressable style={{
        padding: 10,
        backgroundColor: 'salmon',
        marginBottom: 20
      }} disabled={isChecking} onPress={findAuthenTypes}>
        <Text>{isChecking ? 'Checking ...' : 'Test authen'}</Text>
      </Pressable>
      <Text>{text}</Text>
    </>
  )
}