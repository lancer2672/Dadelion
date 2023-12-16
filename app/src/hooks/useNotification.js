import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";
import { requestNotificationPermission } from "@src/permissions";
import {
  getMessagingToken,
  handleOnNotificationOpenedApp,
} from "@src/services/messaging";
import messagingNotificationIns from "@src/services/notifee/MessagingNotification";
import { addActionListener } from "@src/services/notifee/notifee";
import { userSelector } from "@src/store/selector";
import {
  responseFriendRequest,
  sendMessage,
  setSelectedChannel,
} from "@src/store/slices/chatSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import userApi from "@src/api/user";
import { MessageType, NotificationType } from "@src/constants";
import friendRequestNotificationIns from "@src/services/notifee/FriendRequestNotification";
import Notification from "@src/services/notifee/Notification";
import postNotificationIns from "@src/services/notifee/PostNotification";
import { useGetChannelsQuery } from "@src/store/slices/api/chatApiSlice";
import { useGetAllPostsQuery } from "@src/store/slices/api/postApiSlice";
import { setSelectedPost } from "@src/store/slices/postSlice";

const notificationClassIns = {
  [NotificationType.CHAT]: messagingNotificationIns,
  [NotificationType.POST]: postNotificationIns,
  [NotificationType.FRIEND_REQUEST]: friendRequestNotificationIns,
};
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
    const { type, avatar, message, notificationId, nickname, createdAt } =
      messageData;
    console.log("handleIncomingNotification", messageData);

    checIfExistNotificationItem(messageData);
    switch (type) {
      case NotificationType.CHAT: {
        const newMessage = {
          user: { avatar, nickname },
          body: message,
          createdAt,
        };
        notificationClassIns[type].addMessage({
          channelId: notificationId,
          message: newMessage,
        });
        break;
      }
      case NotificationType.POST: {
        notificationClassIns[type].addPrefixNickname({
          postId: notificationId,
          nickname,
        });
        break;
      }
    }
    await notificationClassIns[type].displayNotification(notificationId);
  };

  const checIfExistNotificationItem = (messageData) => {
    const { type, avatar, message, notificationId, nickname, createdAt } =
      messageData;

    let newNotificationItem;
    switch (type) {
      case NotificationType.CHAT: {
        newNotificationItem = {
          messages: [],
        };
        break;
      }
      case NotificationType.POST: {
        newNotificationItem = {
          prefixNicknames: [],
          message,
        };
        break;
      }
      case NotificationType.FRIEND_REQUEST: {
        newNotificationItem = {
          nickname,
          avatar,
        };
        break;
      }
    }
    if (!notificationClassIns[type].hasNoficationItem(notificationId)) {
      notificationClassIns[type].addNotificationItem(
        notificationId,
        newNotificationItem
      );
    }
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
  const sendResponseRequest = (responseValue, requestId) => {
    dispatch(
      responseFriendRequest({
        requestId,
        responseValue,
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
      sendResponseRequest,
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
