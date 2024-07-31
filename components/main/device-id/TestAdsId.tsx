import { useCallback, useEffect, useState } from "react";
import { getAdvertisingId, requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { Platform, StyleSheet, Text, View } from "react-native";
import * as Application from 'expo-application';

const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';

export default function TestAdsId() {
  const [adsId, setAdsId] = useState<string>('Waiting: ...');
  const [deviceId, setDeviceId] = useState<string>('Waiting: ...');

  const getAdsId = useCallback(async () => {
    const { granted } = await requestTrackingPermissionsAsync();
    if (granted) {
      let id = getAdvertisingId();
      if (id) {
        setAdsId(id);
      } else {
        setAdsId('Id not found!');
      }
    } else {
      setAdsId('Permission denied!')
    }
  }, []);

  const getDeviceId = useCallback(async () => {
    let id = '';
    try {
      if (isAndroid) {
        id = Application.getAndroidId();
      } else if (isIOS) {
        let _id = await Application.getIosIdForVendorAsync();
        if (_id) id = _id;
      }
      setDeviceId(id);
    } catch (err) {
      setDeviceId('Cannot get device ID');
    }
  }, [])

  useEffect(() => {
    getAdsId();
    getDeviceId();
  }, [getAdsId, getDeviceId])

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{`Ads ID: ${adsId}`}</Text>
      <Text style={styles.paragraph}>{`Device ID: ${deviceId}`}</Text>
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
    marginBottom: 20
  },
});