import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const earthRadiusInMeters = 6.371 * (10 ** 6);

const deg2rad = (deg: number) => deg * (Math.PI/180);

const getDistanceFromLatLonInMeters = (
  lat1: number, lon1: number, lat2: number, lon2: number
) => {
  let R = earthRadiusInMeters;
  let dLat = deg2rad(lat2-lat1);
  let dLon = deg2rad(lon2-lon1);
  let a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  let d = R * c; // Distance in km
  return d;
}

export default function TestLocation() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>('');

  const getLocation = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location && location.mocked) {
        setErrorMsg('GPS is being mocked, dont try to trick us!');
        return;
      }
      setLocation(location);
  }, [])

  useEffect(() => {
    getLocation();
  }, [getLocation])

  let text = 'Waiting..';
  if (errorMsg !== '') {
    text = errorMsg;
  } else if (location) {
    let latitude = location.coords.latitude;
    let longitude = location.coords.longitude
    let distance = getDistanceFromLatLonInMeters(
      latitude,
      longitude,
      10.740874, // Trường Tiểu học Tân Quy
      106.7045001
    ).toLocaleString() + ' mét';
    text = `Vĩ độ: ${latitude};\n`
    + `Kinh độ: ${longitude};\n`
    + `Khoảng cách: ${distance}`
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