import { useCallback, useEffect, useState } from "react";
import { getAdvertisingId, requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { StyleSheet, Text, View } from "react-native";

export default function TestAdsId() {
  const [adsId, setAdsId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const getDeviceId = useCallback(async () => {
    const { granted } = await requestTrackingPermissionsAsync();
    if (granted) {
      let id = getAdvertisingId();
      if (id) {
        setAdsId(id);
      } else {
        setErrorMsg('Id not found!');
      }
    } else {
      setErrorMsg('Permission denied!')
    }
  }, []);

  useEffect(() => {
    getDeviceId();
  }, [getDeviceId])

  let text = 'Waiting..';
  if (errorMsg !== '') {
    text = errorMsg;
  } else if (adsId !== '') {
    text = adsId;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});