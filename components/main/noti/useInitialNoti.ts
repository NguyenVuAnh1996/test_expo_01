import { useCallback, useEffect, useRef } from "react";
import * as Notifications from 'expo-notifications';
import { Platform } from "react-native";

const useInitialNoti = (): [
  React.MutableRefObject<Notifications.Subscription | undefined>,
  React.MutableRefObject<Notifications.Subscription | undefined>
] => {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const settingUp = useCallback(async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FA8072',
        sound: 'bike_bell.wav',
      });
    }
  }, []);

  useEffect(() => {
    settingUp();

    notificationListener.current = Notifications.addNotificationReceivedListener(() => {
      // something
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(() => {
      // something else
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [settingUp]);

  return [ notificationListener, responseListener ]
}

export default useInitialNoti;