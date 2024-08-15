import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

export const getNotiToken = async (): Promise<string | null> => {
  let token: string | null = null;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return null;
    }
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
    } catch (e) {
      return null;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}