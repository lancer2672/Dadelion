import messaging from "@react-native-firebase/messaging";
import {
  getMessagingToken,
  handleOnNotificationOpenedApp,
} from "@src/services/messaging";
import { requestNotificationPermission } from "@src/permissions";
import { enableForegroundNotification } from "@src/services/notifee/notifee";
import messagingNotificationIns from "@src/services/notifee/MessagingNotification";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import { sendMessage } from "@src/store/slices/chatSlice";
import { AndroidImportance } from "@notifee/react-native";
import { MessageType } from "@src/constants";
import userApi from "@src/api/user";

const useNotification = () => {
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const setIsBgNotificationEnable = (isEnabled) => {
    messagingNotificationIns.enable = isEnabled;
  };
  useEffect(() => {
    if (user) {
      (async () => {
        messagingNotificationIns.addUserInfor(user);
      })();
    }
  }, [user]);
  const handleIncomingMessage = async (remoteMessage) => {
    console.log("handleIncomingMessage", remoteMessage);
    console.log("handle", JSON.parse(remoteMessage.data.data));
    const messageData = JSON.parse(remoteMessage.data.data);
    // const { body } = notification;
    const {
      avatar,
      message,
      channelId: notificationId,
      nickname,
      createdAt,
    } = messageData;
    if (!messagingNotificationIns.hasNotification(notificationId)) {
      messagingNotificationIns.addNotificationItem(notificationId);
    }
    const newMessage = {
      user: { avatar, nickname },
      body: message,
      createdAt,
    };
    messagingNotificationIns.addMessage({
      notificationId,
      message: newMessage,
    });
    messagingNotificationIns.displayNotification(notificationId);
  };

  const handleUserReply = (userInput, notificationId) => {
    const newMessage = {
      user: { avatar: user.avatar, nickname: user.nickname },
      body: userInput,
      createdAt: Date.now(),
    };
    // messagingNotificationIns.addMessage({
    //   notificationId,
    //   message: newMessage,
    // });
    console.log("handleUserReply");
    dispatch(
      sendMessage({
        channelId: notificationId,
        newMessage: userInput,
        type: MessageType.TEXT,
      })
    );
  };

  const removeNotificationItem = async (id) => {
    await messagingNotificationIns.removeNotificationItem(id);
  };
  const enableNotifications = () => {
    console.log("enableNotifications");
    //notifee
    requestNotificationPermission();
    enableForegroundNotification({ removeNotificationItem, handleUserReply });

    handleOnNotificationOpenedApp();
    messaging().setBackgroundMessageHandler(handleIncomingMessage);

    const onTokenRefresh = getMessagingToken(userApi.saveFCMtoken);
    const unsubscribeRemoteMessaging = messaging().onMessage(
      handleIncomingMessage
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
