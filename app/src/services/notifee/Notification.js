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
  constructor({
    notificationId,
    channelId,
    importance = AndroidImportance.DEFAULT,
  }) {
    this.notificationId = notificationId;
    this.createChannel({ channelId, importance });
    this.enable = true;
  }

  async createChannel({ channelId, importance }) {
    this.channelId = await notifee.createChannel({
      id: channelId,
      name: "channelId",
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
    if (!this.enable) return;
    await notifee.displayNotification(notification);
  }

  async stopForegroundService() {
    await notifee.stopForegroundService();
  }
}

export default Notification;
