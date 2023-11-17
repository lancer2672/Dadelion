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

export function enableForegroundNotification() {
  return notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log("User dismissed notification", detail.notification);
        break;
      case EventType.PRESS:
        console.log("User pressed notification", detail.notification);
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

export const registerForegroundService = () => {
  console.log("notificationregister");

  notifee.registerForegroundService((notification) => {
    console.log("notificationregister 1", notification);
    return new Promise(() => {
      notifee.onForegroundEvent(async ({ type, detail }) => {
        if (
          type === EventType.ACTION_PRESS &&
          detail.pressAction.id === "delete"
        ) {
          await notifee.stopForegroundService();
        }
      });
      notifee.onBackgroundEvent(async ({ type, detail }) => {
        notifee.onBackgroundEvent(async ({ type, detail }) => {
          if (type === EventType.ACTION_PRESS) {
            switch (detail.pressAction.id) {
              case "delete":
                await notifee.stopForegroundService();
                console.log("Clicked delete");
                break;
              case "100":
                console.log("Clicked 100");

                break;
              case "200":
                console.log("Clicked 200");
                break;
              default:
                console.log("No handler for this action");
            }
          }
        });
      });
    });
  });
  console.log("notificationregister1");
};
