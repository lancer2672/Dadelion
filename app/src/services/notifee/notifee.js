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

export function addActionListener({
  handleNavigation,
  removeNotificationItem,
  handleUserReply,
}) {
  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
      console.log("User pressed an action with the id: ", detail.input, detail);
      handleUserReply(detail.input, detail.notification.id);
    }
  });
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    const notification = detail.notification;
    switch (type) {
      case EventType.DISMISSED:
        console.log("User dismissed notification", notification);
        await removeNotificationItem(notification.data.type,notification.id);
        break;
      case EventType.PRESS:
        console.log("User pressed notification", notification);
        handleNavigation(notification);
        await removeNotificationItem(notification.data.type, notification.id);
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
