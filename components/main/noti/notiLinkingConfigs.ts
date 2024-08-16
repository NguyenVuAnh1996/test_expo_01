import { Linking } from 'react-native';
import * as Notifications from 'expo-notifications';
import { LinkingOptions } from '@react-navigation/native';
import * as ExpoLinking from 'expo-linking';
import routes from '@/screens/routes';

const notiLinkingConfig: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['myapp:/'],
  async getInitialURL() {
    // First, you may want to do the default deep link handling
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();

    if (url != null) {
      return url;
    }

    // Handle URL from expo push notifications
    const response = await Notifications.getLastNotificationResponseAsync();

    if (response) {
      return response?.notification.request.content.data.url;
    }

    return 'myapp:/' + routes.Home.link;
  },
  subscribe(listener) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    // Listen to incoming links from deep linking
    const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);

    // Listen to expo push notifications
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      // let url = response?.notification?.request?.content?.data?.url;
      // console.log('res: ', JSON.stringify(response))
      let _trigger: any = response?.notification?.request?.trigger;
      // let url = _trigger?.channelId.replace('test_channel_', '');
      let url = String(_trigger?.channelId).includes('test_channel_')
      ? _trigger?.channelId.replace('test_channel_', '')
      : null;
      if (!url) {
        url = 'myapp://' + routes.Home.link;
      }

      // Let React Navigation handle the URL
      listener(url);
    });

    return () => {
      // Clean up the event listeners
      eventListenerSubscription.remove();
      subscription.remove();
    };
  },
};

export default notiLinkingConfig;