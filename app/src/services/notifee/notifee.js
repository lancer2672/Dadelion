import { AppState, Alert } from "react-native";
import notifee, {
  TriggerType,
  TimeUnit,
  EventType,
  AndroidImportance,
  RepeatFrequency,
  AndroidStyle,
} from "@notifee/react-native";

export async function checkForInitialNotification() {
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
  }
}

export function enableForegroundNotification({
  removeNotificationItem,
  handleUserReply,
}) {
  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
      console.log("User pressed an action with the id: ", detail.input, detail);
      handleUserReply(detail.input, detail.notification.id);
    }
  });
  notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log("User dismissed notification", detail.notification);
        removeNotificationItem(detail.notification.id);
        break;
      case EventType.PRESS:
        console.log("User pressed notification", detail.notification);
        removeNotificationItem(detail.notification.id);
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
