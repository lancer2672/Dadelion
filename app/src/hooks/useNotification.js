import messaging from "@react-native-firebase/messaging";
import { getMessagingToken } from "@src/services/messaging";
import { requestNotificationPermission } from "@src/permissions";
import {
  enableForegroundNotification,
  registerForegroundService,
} from "@src/services/notifee/notifee";
import messagingNotificationIns from "@src/services/notifee/MessagingNotification";
import { useSaveFCMtokenMutation } from "@src/store/slices/api/userApiSlice";

const useNotification = () => {
  const setIsBgNotificationEnable = (isEnabled) => {
    messagingNotificationIns.enable = isEnabled;
  };
  const [saveFCMtoken, { error }] = useSaveFCMtokenMutation();
  const enableNotifications = () => {
    //notifee
    requestNotificationPermission();
    enableForegroundNotification();
    registerForegroundService();
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
      messagingNotificationIns.displayNotification();
    });
    const onTokenRefresh = getMessagingToken(saveFCMtoken);
    const unsubscribeRemoteMessaging = messaging().onMessage(
      async (remoteMessage) => {
        console.log("A new FCM message arrived!", remoteMessage);
      }
    );
    return () => {
      onTokenRefresh();
      unsubscribeRemoteMessaging();
    };
  };

  return {
    setIsBgNotificationEnable,
    enableNotifications,
  };
};

export default useNotification;
