import { AppState, Alert } from "react-native";
import notifee, {
  TriggerType,
  TimeUnit,
  EventType,
  AndroidImportance,
  RepeatFrequency,
  AndroidStyle,
} from "@notifee/react-native";
import { NotificationType } from "@src/constants";

export async function onAppOpened(handleNavigation) {
  const initialNotification = await notifee.getInitialNotification();

  if (initialNotification) {
    console.log(
      "Notification caused application to open",
      initialNotification.notification
    );
    console.log(
      "Press action used to open the app",
      initialNotification.pressAction
    );
    // handleNavigation(initialNotification.notification);
  }
}

const onPress = async ({
  notificationDetail,
  handleUserReply,
  sendResponseRequest,
  removeNotificationItem,
}) => {
  const { notification, pressAction } = notificationDetail;
  await removeNotificationItem(notification.data.type, notification.id);
  console.log("onACtionPress", pressAction);
  if (pressAction) {
    switch (pressAction.id) {
      case "reply": {
        handleUserReply(notificationDetail.input, notification.id);
        return;
      }
      case "friendRequest-accept": {
        sendResponseRequest("accept", notification.id);
        return;
      }
      case "friendRequest-decline": {
        sendResponseRequest("decline", notification.id);
        return;
      }
    }
  }
};
export function addActionListener({
  handleNavigation,
  removeNotificationItem,
  handleUserReply,
  sendResponseRequest,
}) {
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    console.log("ONbackground", type, detail);
    const notification = detail.notification;
    switch (type) {
      case EventType.DISMISSED:
        console.log("User dismissed notification", notification);
        await removeNotificationItem(notification.data.type, notification.id);
        break;
      case EventType.ACTION_PRESS:
        await onPress({
          notificationDetail: detail,
          handleUserReply,
          sendResponseRequest,
          removeNotificationItem,
        });
        break;
      case EventType.PRESS:
        console.log("DETAIIL", detail);
        handleNavigation(notification);

        console.log("User pressed notification", notification);
        break;
      case EventType.APP_BLOCKED: {
        console.log("User toggled app blocked", detail.blocked);
        break;
      }
      case EventType.CHANNEL_BLOCKED: {
        console.log(
          "User toggled channel block",
          detail.channel.id,
          detail.blocked
        );
        break;
      }
      case EventType.CHANNEL_GROUP_BLOCKED: {
        console.log(
          "User toggled channel group block",
          detail.channelGroup.id,
          detail.blocked
        );
        break;
      }
    }
  });
}
