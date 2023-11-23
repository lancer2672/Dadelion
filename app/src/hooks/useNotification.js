import messaging from "@react-native-firebase/messaging";
import {
  getMessagingToken,
  handleOnNotificationOpenedApp,
} from "@src/services/messaging";
import { requestNotificationPermission } from "@src/permissions";
import { addActionListener, onAppOpened } from "@src/services/notifee/notifee";
import messagingNotificationIns from "@src/services/notifee/MessagingNotification";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "@src/store/selector";
import { sendMessage, setSelectedChannel } from "@src/store/slices/chatSlice";
import { useLinkTo, useNavigation } from "@react-navigation/native";

import { MessageType, NotificationType } from "@src/constants";
import userApi from "@src/api/user";
import {
  useFindOrCreateChannelMutation,
  useGetChannelsQuery,
} from "@src/store/slices/api/chatApiSlice";
import postNotificationIns from "@src/services/notifee/PostNotification";
import { useGetAllPostsQuery } from "@src/store/slices/api/postApiSlice";
import { setSelectedPost } from "@src/store/slices/postSlice";
import Notification from "@src/services/notifee/Notification";

const useNotification = () => {
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { data: channels } = useGetChannelsQuery(user._id);
  const { data: postData } = useGetAllPostsQuery();

  const setIsBgNotificationEnable = (isEnabled) => {
    Notification.enable = isEnabled;
  };
  console.log("posts", postData);
  useEffect(() => {
    if (user) {
      (async () => {
        messagingNotificationIns.addUserInfor(user);
      })();
    }
  }, [user]);

  const handleIncomingNotification = async (remoteMessage) => {
    const messageData = JSON.parse(remoteMessage.data.data);
    const { type, avatar, message, channelId, nickname, createdAt } =
      messageData;
    console.log("handleIncomingNotification", messageData);
    switch (type) {
      case NotificationType.CHAT: {
        await handleDisplayChatNotification(messageData);
        break;
      }
      case NotificationType.POST: {
        await handleDisplayPostNotification(messageData);
        break;
      }
    }
  };

  const handleDisplayChatNotification = async (data) => {
    const { type, avatar, message, channelId, nickname, createdAt } = data;
    //create notificationItem to store all notification message
    if (!messagingNotificationIns.hasNoficationItem(channelId)) {
      messagingNotificationIns.addNotificationItem(channelId);
    }

    const newMessage = {
      user: { avatar, nickname },
      body: message,
      createdAt,
    };
    messagingNotificationIns.addMessage({
      channelId,
      message: newMessage,
    });
    await messagingNotificationIns.displayNotification(channelId);
  };
  const handleDisplayPostNotification = async (data) => {
    const { postId, nickname, message } = data;

    if (!postNotificationIns.hasNoficationItem(postId)) {
      postNotificationIns.addNotificationItem(postId, message);
    }
    postNotificationIns.addPrefixNickname({
      postId,
      nickname,
    });
    await postNotificationIns.displayNotification(postId);
  };
  const handleUserReply = (userInput, notificationId) => {
    dispatch(
      sendMessage({
        channelId: notificationId,
        newMessage: userInput,
        type: MessageType.TEXT,
      })
    );
  };
  const handleNavigation = ({ data }) => {
    const { type } = data;
    console.log("handleNavigation", data);
    switch (type) {
      case NotificationType.CHAT: {
        if (channels) {
          const selectedChannel = channels.find(
            (c) => c._id === data.channelId
          );
          dispatch(setSelectedChannel(selectedChannel));
          navigation.navigate("ChatRoom");
          console.log("navigate chat room", selectedChannel);
        }
        break;
      }
      case NotificationType.POST: {
        if (postData && postData.posts) {
          const selectedPost = postData.posts.find(
            (c) => c._id === data.postId
          );
          dispatch(setSelectedPost(selectedPost));
          console.log("navigate detailpost", selectedPost);
          navigation.navigate("DetailPost", {});
        }
        break;
      }
      case NotificationType.FRIEND_REQUEST: {
        break;
      }
      default: {
        console.log("invalid type", type);
      }
    }
  };
  const removeNotificationItem = async (type, id) => {
    switch (type) {
      case NotificationType.CHAT: {
        await messagingNotificationIns.removeNotificationItem(id);
        break;
      }
      case NotificationType.POST: {
        await postNotificationIns.removeNotificationItem(id);
        break;
      }
      default: {
        console.log("invalid type", type);
      }
    }
  };

  const enableNotifications = () => {
    //notifee
    requestNotificationPermission();
    addActionListener({
      handleNavigation,
      removeNotificationItem,
      handleUserReply,
    });

    handleOnNotificationOpenedApp();
    // onAppOpened(handleNavigation);

    messaging().setBackgroundMessageHandler(handleIncomingNotification);
    const onTokenRefresh = getMessagingToken(userApi.saveFCMtoken);
    const unsubscribeRemoteMessaging = messaging().onMessage(
      handleIncomingNotification
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
