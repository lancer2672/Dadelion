import { AppState, Alert } from "react-native";
import notifee, {
  TriggerType,
  TimeUnit,
  EventType,
  AndroidImportance,
  RepeatFrequency,
  AndroidStyle,
} from "@notifee/react-native";
class Notification {
  static enable = true;
  constructor({ notificationChannelId, importance }) {
    this.createChannel({ notificationChannelId, importance });
  }
  async createChannel({
    notificationChannelId,
    importance = AndroidImportance.DEFAULT,
  }) {
    this.notificationChannelId = await notifee.createChannel({
      id: notificationChannelId,
      name: notificationChannelId,
      importance,
    });
  }

  // async checkingBatterySavingEnabled() {
  //   const batteryOptimizationEnabled =
  //     await notifee.isBatteryOptimizationEnabled();
  //   if (batteryOptimizationEnabled) {
  //     // 2. ask your users to disable the feature
  //     Alert.alert(
  //       "Restrictions Detected",
  //       "To ensure notifications are delivered, please disable battery optimization for the app.",
  //       [
  //         // 3. launch intent to navigate the user to the appropriate screen
  //         {
  //           text: "OK, open settings",
  //           onPress: async () =>
  //             await notifee.openBatteryOptimizationSettings(),
  //         },
  //         {
  //           text: "Cancel",
  //           onPress: () => console.log("Cancel Pressed"),
  //           style: "cancel",
  //         },
  //       ],
  //       { cancelable: false }
  //     );
  //   }
  // }

  async displayNotification(notification) {
    if (!Notification.enable) return;
    await notifee.displayNotification(notification);
  }

  async stopForegroundService() {
    await notifee.stopForegroundService();
  }
}

export default Notification;
